<?php
/**
 * Created by PhpStorm.
 * User: jacop
 * Date: 23-Feb-20
 * Time: 1:44 AM
 */

namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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




}