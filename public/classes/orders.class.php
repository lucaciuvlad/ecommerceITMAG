<?php
require_once("database.class.php");
require_once("cart.class.php");
require_once("../../vendor/autoload.php");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class Order extends Database
{
    private $userId;

    public function __construct($UserId)
    {
        $this->userId = $UserId;
    }

    public function getUserOrder()
    {
        $selectSql = "SELECT id FROM orders WHERE user_id = ? ORDER BY id DESC LIMIT 1";
        $selectStmt = $this->connect()->prepare($selectSql);
        $selectStmt->bind_param("i", $this->userId);

        if ($selectStmt->execute()) {
            $userOrder = $selectStmt->get_result();
            return $userOrder;
        }
    }

    public function placeOrder()
    {
        $insertSql = "INSERT INTO orders(user_id) VALUES(?)";
        $insertStmt = $this->connect()->prepare($insertSql);
        $insertStmt->bind_param("i", $this->userId);

        if ($insertStmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
}

class OrderDetails extends Database
{
    private $orderId;
    private $productId;
    private $productQuantity;

    public function setOrderId($OrderId)
    {
        $this->orderId = $OrderId;
    }

    public function setProductId($ProductId)
    {
        $this->productId = $ProductId;
    }

    public function setProductQuantity($ProductQuantity)
    {
        $this->productQuantity = $ProductQuantity;
    }

    public function insertOrderDetails()
    {
        $insertSql = "INSERT INTO order_details(order_id, product_id, quantity) VALUES(?, ?, ?)";
        $insertStmt = $this->connect()->prepare($insertSql);
        $insertStmt->bind_param("iii", $this->orderId, $this->productId, $this->productQuantity);

        if ($insertStmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    private function getOrderDetails($userId, $orderId)
    {
        $orderDetails = array();

        $selectUserOrder =
            "   SELECT	quantity, product_name, product_price, product_image 
                FROM	orders, order_details, products, product_images
                WHERE	orders.user_id = $userId AND order_details.order_id = $orderId AND
                        order_details.product_id = products.id AND
                        product_images.product_id = products.id
                GROUP BY products.id;
            ";
        $userOrders = $this->connect()->query($selectUserOrder);

        $productNames = array();
        $productImages = array();
        $productPrices = array();
        $productQuantities = array();
        $productTotalPrices = array();

        foreach ($userOrders as $userOrder) {
            array_push($productNames, $userOrder["product_name"]);
            array_push($productImages, $userOrder["product_image"]);
            array_push($productPrices, $userOrder["product_price"]);
            array_push($productQuantities, $userOrder["quantity"]);
            array_push($productTotalPrices, $userOrder["product_price"] * $userOrder["quantity"]);
        }

        $orderDetails["productNames"] = $productNames;
        $orderDetails["productImages"] = $productImages;
        $orderDetails["productPrices"] = $productPrices;
        $orderDetails["productQuantities"] = $productQuantities;
        $orderDetails["productTotalPrices"] = $productTotalPrices;

        $selectUserInfo = "SELECT * FROM users WHERE id = $userId";
        $userInfo = $this->connect()->query($selectUserInfo)->fetch_assoc();

        $selectUserAddress = "SELECT user_full_address, user_phone_number FROM user_addresses WHERE user_id = $userId";
        $userAddress = $this->connect()->query($selectUserAddress)->fetch_assoc();

        $orderDetails["userEmail"] = $userInfo["user_email"];
        $orderDetails["userFirstName"] = $userInfo["user_first_name"];
        $orderDetails["userLastName"] = $userInfo["user_last_name"];

        $orderDetails["userAddress"] = $userAddress["user_full_address"];
        $orderDetails["userPhoneNumber"] = $userAddress["user_phone_number"];

        return $orderDetails;
    }

    public function sendOrderEmail($orderId, $userId)
    {
        $orderDetails = $this->getOrderDetails($userId, $orderId);
        $orderDetails["orderId"] = $orderId;

        $productImages = $orderDetails["productImages"];
        $productNames = $orderDetails["productNames"];
        $productPrices = $orderDetails["productPrices"];
        $productQuantities = $orderDetails["productQuantities"];
        $productTotalPrices = $orderDetails["productTotalPrices"];

        $email = new PHPMailer(true);

        try {
            // $email->SMTPDebug;
            $email->isSMTP();
            $email->Host = "smtp.gmail.com";
            $email->SMTPAuth = true;
            $email->Username = "noreply.itmag@gmail.com";
            $email->Password = "Itmag123#";
            $email->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $email->Port = 587;

            $email->setFrom("noreply.itmag@gmail.com", "ITMAG Admin");
            $email->addAddress($orderDetails["userEmail"]);
            $email->addEmbeddedImage("../assets/imgs/itmag-logo.png", "itmag-logo", "itmag-logo.png");

            foreach ($productImages as $productImage) {
                $email->addEmbeddedImage("../../admin/assets/imgs/$productImage", $productImage, $productImage);
            }

            $email->isHTML(true);
            $email->Subject = "Comanda cu numarul " . $orderDetails["orderId"];

            $outputHTML = "
            <!DOCTYPE html>
            <html>
                <head>
                </head>
                <body>
                    <main>
                        <header>
                            <img src='cid:itmag-logo' alt='ITMAG Logo' width='100' height='50'>
                        </header>
                        <div>
                            <p> Buna $orderDetails[userLastName] $orderDetails[userFirstName], </p>
                            <p> Iti multumim pentru comanda realizata! </p>
                            <p> Mai jos puteti vedea sumarul comenzii dumneavoastra: </p>

                            <table border='1' style='border-collapse: collapse; width: 100%;'>
                                <tr>
                                    <th align='center'> Imagine </th>
                                    <th align='center'> Nume </th>
                                    <th align='center'> Pret </th>
                                    <th align='center'> Cant. </th>
                                    <th align='center'> Total </th>
                                </tr>
            ";

            $finalPrice = 0;
            for ($i = 0; $i < sizeof($productNames); $i++) {
                $outputHTML .= "
                                <tr>
                                    <td style='text-align: center;'> 
                                        <img src='cid: $productImages[$i]' width='50' height='50' style='padding: 5px;'>
                                    </td>
                                    <td> 
                                        <p style='text-align: center;'> $productNames[$i] </p>
                                    </td>
                                    <td> 
                                        <p style='text-align: center;'> $productPrices[$i] Lei </p>
                                    </td>
                                    <td> 
                                        <p style='text-align: center;'> $productQuantities[$i] buc </p>
                                    </td>
                                    <td> 
                                        <p style='text-align: center;'> $productTotalPrices[$i] Lei </p>
                                    </td>
                                </tr>
                ";
                $finalPrice += floatval($productTotalPrices[$i]);
            }

            $outputHTML .= "
            </table>

                                <p> Adresa de livrare a produselor este: </p>

                                <div style='padding-left: 15px;'>
                                    <p> Adresa: $orderDetails[userAddress] </p>
                                    <p> Numar de telefon: $orderDetails[userPhoneNumber] </p>
                                    <p> Total de plata: $finalPrice Lei </p>
                                </div>

                                <p> Cu stima, </p>
                                <p> Echipa ITMAG </p>
                            </div>
                        </main>
                    </body>
                </html>
            ";

            $email->Body = $outputHTML;

            $email->send();
            return "Email-ul a fost trimis cu succes!";
        } catch (Exception $e) {
            return "A aparut o eroare la trimiterea email-ului!" . $e->getMessage();
        }
    }
}
?>

<?php
// Place Order
if (isset($_POST["product"]) && isset($_POST["userId"])) {
    $productJsonObjects = $_POST["product"];
    $userId = htmlentities($_POST["userId"]);

    $orderHandler = new Order($userId);
    $orderHandler->placeOrder();
    $userOrderId = $orderHandler->getUserOrder()->fetch_assoc()["id"];

    $orderDetailsHandler = new OrderDetails();
    $orderDetailsHandler->setOrderId($userOrderId);

    for ($i = 0; $i < sizeof($productJsonObjects); $i++) {
        $productObject = json_decode($productJsonObjects[$i]);

        $orderDetailsHandler->setProductId($productObject->productId);
        $orderDetailsHandler->setProductQuantity($productObject->productQuantity);
        $orderDetailsHandler->insertOrderDetails();
    }

    $orderDetailsHandler->sendOrderEmail($userOrderId, $userId);

    $cartHandler = new Cart($userId);
    $userCartId = $cartHandler->getUserCart()->fetch_assoc()["id"];

    $cartDetailsHandler = new CartDetails($userCartId, $productObject->productId);
    $cartDetailsHandler->setQuantity($productObject->productQuantity);
    $cartDetailsHandler->deleteCartDetails();

    echo json_encode(array("orderId" => $userOrderId));
}
?>