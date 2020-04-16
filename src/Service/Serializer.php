<?php
/**
 * Created by PhpStorm.
 * User: jacop
 * Date: 15-Apr-20
 * Time: 10:24 PM
 */

namespace App\Service;


use Symfony\Component\Serializer\Encoder\JsonEncode;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class Serializer extends \Symfony\Component\Serializer\Serializer
{

    public function __construct()
    {

        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];

        parent::__construct($normalizers, $encoders);
    }

}