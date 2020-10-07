<?php


namespace App\Controller;

use Omnipay\Omnipay;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;


/**
 * Class StripeController
 * @package App\Controller
 * @Route("/api/payment")
 */
class StripeController extends AbstractController
{
    private $router;

    public function __construct(UrlGeneratorInterface $router)
    {
        $this->router = $router;
    }

    /**
     * @param Request $request
     * @Route("/booking", methods={"POST"})
     * @return Response
     */
    public function booking(Request $request){

        $token = json_decode($request->request->get('cardInfo'));

        $info = json_decode($request->request->get('info'), true);
        $addonInfo = json_decode($request->get('addonInfo'), true);
        $cardInfo = json_decode($request->get('cardInfo'), true);

        $amountInfo = json_decode($request->get('amountInfo'),true);

        //stripe payment

        $response = $this->stripePayment($token, $amountInfo);

        //creazione tenancy su arthur (director?)

        return new Response($response);

        //send email




    }


    private function stripePayment($token, $amountDetails){
        $stripe = Omnipay::create('Stripe');
        $stripe->setApiKey('sk_test_8GCPDMiC8WmtbiS77TGzvJ9M');

        $url = $this->router->generate("home", ["route"=>"success"], UrlGeneratorInterface::ABSOLUTE_PATH);

// Send purchase request
        $response = $stripe->authorize([
            'amount' => '1',
            'currency' => 'USD',
            'description' => 'This is a test purchase transaction.',
            'token' => $token->id,
            'returnUrl' => $url,
            'confirm' => true,
        ])->send();

// Process response
        if ($response->isSuccessful()) {

            // Payment was successful

        } elseif ($response->isRedirect()) {

    // Redirect to offsite payment gateway
            $response->redirect();

        } else {

            // Payment failed
            echo $response->getMessage();
        }
    }

}