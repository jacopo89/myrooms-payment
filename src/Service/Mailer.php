<?php
/**
 * Created by PhpStorm.
 * User: jacop
 * Date: 16-Apr-20
 * Time: 8:42 AM
 */

namespace App\Service;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class Mailer extends AbstractController
{
    private $mailer;
    public function __construct(\Swift_Mailer $mailer)
    {
        $this->mailer = $mailer;
    }

    public function registrationMail($receiverMail){

        $message = (new \Swift_Message('Hello Email'))
            ->setFrom('jacopo.trapani@utenti.com')
            ->setTo($receiverMail)
            ->setBody(
                $this->renderView(
                // templates/emails/registration.html.twig
                    'emails/login/registration.html.twig',
                    ['name' => $receiverMail]
                ),
                'text/html'
            )

            // you can remove the following code if you don't define a text version for your emails
        ;

        $this->mailer->send($message);
    }

    public function recoveryPasswordMail($receiverMail, $newRecoveryKey){
        $message = (new \Swift_Message('Hello Email'))
            ->setFrom('jacopo.trapani@utenti.com')
            ->setTo($receiverMail)
            ->setBody(
                $this->renderView(
                // templates/emails/registration.html.twig
                    'emails/login/recoverypassword.html.twig',
                    ['recoveryKey' => $newRecoveryKey]
                ),
                'text/html'
            )
        ;

        $this->mailer->send($message);

    }

}