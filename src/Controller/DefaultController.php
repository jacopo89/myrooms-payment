<?php
/**
 * Created by PhpStorm.
 * User: jacop
 * Date: 23-Feb-20
 * Time: 1:44 AM
 */

namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{


    /**
     * @Route("/{route}", name="home", requirements={"route"="^(?!api).*$"})
     */
    public function index()
    {
        return $this->render('default/base.html.twig');
    }


    /**
     * @param Request $request
     * @return Response
     * @Route("/api/redirect")
     */
    public function main(Request $request){

        $roomInfo = $request->get('roomInfo');//formato json

        return $this->render('default/base.html.twig',['roomInfo'=>$roomInfo]);
    }


    /**
     * @param Request $request
     * @Route("/api/create_payment")
     */
    public function createPayment(Request $request){

    }


}