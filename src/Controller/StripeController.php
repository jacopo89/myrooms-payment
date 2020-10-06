<?php


namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


/**
 * Class StripeController
 * @package App\Controller
 * @Route("/api/payment")
 */
class StripeController extends AbstractController
{


    /**
     * @param Request $request
     * @Route("/booking", methods={"POST"})
     * @return JsonResponse
     */
    public function booking(Request $request){

        $info = json_decode($request->request->get('info'), true);
        $addonInfo = json_decode($request->get('addonInfo'), true);
        $cardInfo = json_decode($request->get('cardInfo'), true);

        $amountInfo = json_decode($request->get('amountInfo'),true);

        //stripe payment

        $this->stripePayment($cardInfo, $amountInfo);

        //creazione tenancy su arthur (director?)


        //send email




    }


    private function stripePayment($cardDetails, $amountDetails){
        $gateway = Omnipay::create('Stripe');
        $gateway->setApiKey('');

// Example form data
        $cardData = [
            'number' => $cardDetails["number"],
            'expiryMonth' => $cardDetails["expiryMonth"],
            'expiryYear' => $cardDetails["expiryYear"],
            'cvv' => $cardDetails["cvv"]
        ];

// Send purchase request
        $response = $gateway->authorize(
            [
                'amount' => $amountDetails["amount"],
                'currency' => $amountDetails["currency"],
                'card' => $cardData
            ]
        )->send();

// Process response
        if ($response->isSuccessful()) {

            // Payment was successful
            print_r($response);

        } elseif ($response->isRedirect()) {

    // Redirect to offsite payment gateway
            $response->redirect();

        } else {

            // Payment failed
            echo $response->getMessage();
        }
    }

    private function stripeToken(){
        $gateway = Omnipay::create('Stripe');
        $gateway->setApiKey('');

    }
}