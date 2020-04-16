<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\Mailer;
use App\Service\Serializer;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    private $em;
    private $mailer;
    private $serializer;

    public function __construct(EntityManagerInterface $em, Mailer $mailer, Serializer $serializer)
    {
        $this->em = $em;
        $this->mailer = $mailer;
        $this->serializer = $serializer;
    }

    /**
     * @Route("/login", name="app_login")
     * @param Request $request
     * @param UserPasswordEncoderInterface $encoder
     * @param JWTEncoderInterface $jwtEncoder
     * @return Response
     * @throws \Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTEncodeFailureException
     */
    public function login(Request $request, UserPasswordEncoderInterface $encoder, JWTEncoderInterface $jwtEncoder): Response
    {
        $email = $request->get('email');
        $password = $request->get('password');

        $user = $this->em->getRepository(User::class)->findOneBy(['email'=> $email]);
        if($user){

            if($encoder->isPasswordValid($user, $password)){
                $data = [
                    'email' => $email
                ];

                $token = $jwtEncoder->encode($data);

                $responseData = $token;
                $status = Response::HTTP_OK;
            }else{
                $responseData = "";
                $status = Response::HTTP_UNAUTHORIZED;
            }
        }else{
            $responseData = "User could not be found";
            $status = Response::HTTP_NOT_FOUND;
        }

        return new Response($responseData, $status);
    }

    /**
     * @Route("/register", name="app_register")
     * @param Request $request
     * @param UserPasswordEncoderInterface $encoder
     * @return Response
     */
    public function register(Request $request, UserPasswordEncoderInterface $encoder): Response
    {
        $mail = $request->get('email');
        $password = $request->get('password');

        $user = new User();
        $user->setEmail($mail);
        $encodedPassword = $encoder->encodePassword($user,$password);
        $user->setPassword($encodedPassword);

        $this->em->persist($user);
        $this->em->flush();
        $this->mailer->registrationMail($mail);

        return new Response($user->getId());

    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout()
    {
        throw new \Exception('This method can be blank - it will be intercepted by the logout key on your firewall');
    }

    /**
     * @Route("/recover", name="app_logout")
     * @param Request $request
     * @return Response
     */
    public function recoveryPassword(Request $request)
    {
        $recoveryKey = $request->get('recoveryKey');
        $user = $this->em->getRepository(User::class)->findOneBy(['email'=> $recoveryKey]);
        if($user){
            //generiamo un codice e lo persistiamo con validità 10min
            $newRecoveryKey = self::generateString();
            $user->setRecoveryKey($newRecoveryKey);
            $user->setRecoveryKeyCreationTime(new \DateTime());
            $this->em->persist($user);
            $this->em->flush();

            $this->mailer->recoveryPasswordMail($user->getEmail(), $newRecoveryKey);

            $content = true;
            $status = Response::HTTP_OK;

        }else{
            $content = false;
            $status = Response::HTTP_BAD_REQUEST;

        }

        return new Response($this->serializer->serialize($content, 'json'), $status);

    }

    /**
     * @Route("/passwordchange", name="app_logout")
     * @param Request $request
     * @param UserPasswordEncoderInterface $encoder
     * @return Response
     */
    public function changePassword(Request $request, UserPasswordEncoderInterface $encoder)
    {
        $mail = $request->get('mail');
        $password = $request->get('password');
        $user = $this->em->getRepository(User::class)->findOneBy(['email'=> $mail]);
        if($user){
            $encodedPassword = $encoder->encodePassword($user,$password);
            $user->setPassword($encodedPassword);

            $this->em->persist($user);
            $this->em->flush();

            $content = true;
            $status = Response::HTTP_OK;

        }else{
            $content = false;
            $status = Response::HTTP_BAD_REQUEST;

        }

        return new Response($this->serializer->serialize($content, 'json'), $status);

    }



    private function generateString($strength = 16) {
        $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $input_length = strlen($permitted_chars);
        $random_string = '';
        for($i = 0; $i < $strength; $i++) {
            $random_character = $permitted_chars[mt_rand(0, $input_length - 1)];
            $random_string .= $random_character;
        }

        return $random_string;
    }
}
