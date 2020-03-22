<?php

namespace App\Controller;

use App\Entity\User;
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

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
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
     * @return Response
     */
    public function register(Request $request, UserPasswordEncoderInterface $encoder): Response
    {
        // if ($this->getUser()) {
        //     return $this->redirectToRoute('target_path');
        // }
        $mail = $request->get('email');
        $password = $request->get('password');

        $user = new User();
        $user->setEmail($mail);
        $encodedPassword = $encoder->encodePassword($user,$password);
        $user->setPassword($encodedPassword);

        $this->em->persist($user);
        $this->em->flush();

        return new Response($user->getId());

    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout()
    {
        throw new \Exception('This method can be blank - it will be intercepted by the logout key on your firewall');
    }
}
