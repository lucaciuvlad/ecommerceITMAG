-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 26, 2021 at 09:32 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `itmag`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `admin_email` varchar(255) NOT NULL,
  `admin_password` varchar(255) NOT NULL,
  `admin_first_name` varchar(100) NOT NULL,
  `admin_last_name` varchar(100) NOT NULL,
  `admin_active_account` tinyint(4) NOT NULL DEFAULT 0,
  `admin_registered_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `admin_email`, `admin_password`, `admin_first_name`, `admin_last_name`, `admin_active_account`, `admin_registered_at`) VALUES
(27, 'vladlucaciu0@yahoo.com', '$2y$10$/TJiDCeXZwJjbNEtxO3joOnL6WwjBz863CMhsRa6h.POP2PuV2JN.', 'Lucaciu', 'Vlad', 1, '2021-05-17 21:10:25'),
(28, 'lucaciu_vlad@yahoo.com', '$2y$10$D68JgdzKHTA0TGC24Yb3UO8YzBwz0vip.hXQRKqEfZsGPWErqaQHy', 'Lucaciu', 'Vlad', 1, '2021-06-16 00:52:45');

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` int(11) NOT NULL,
  `brand_name` varchar(100) NOT NULL,
  `brand_created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `brand_name`, `brand_created_at`) VALUES
(1, 'Samsung', '2021-04-29 23:57:12'),
(2, 'Huawei', '2021-05-09 19:28:53'),
(4, 'Dell', '2021-06-26 13:55:19');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `created_at`) VALUES
(446, 9, '2021-06-15 17:45:30'),
(447, 20, '2021-06-26 21:36:19');

-- --------------------------------------------------------

--
-- Table structure for table `cart_details`
--

CREATE TABLE `cart_details` (
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `category_icon` varchar(100) NOT NULL,
  `category_created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_name`, `category_icon`, `category_created_at`) VALUES
(3, 'Telefoane mobile', 'fa-mobile', '2021-05-13 19:47:33'),
(5, 'Laptopuri', 'fa fa-laptop', '2021-06-26 13:54:17');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `created_at`) VALUES
(440, 9, '2021-06-26 19:57:47'),
(441, 9, '2021-06-26 21:13:48'),
(442, 9, '2021-06-26 22:19:18');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`order_id`, `product_id`, `quantity`) VALUES
(440, 51, 1),
(440, 53, 1),
(441, 76, 1),
(441, 77, 1),
(442, 45, 1),
(442, 51, 4);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_name` text NOT NULL,
  `product_metaphone` text NOT NULL,
  `product_price` decimal(7,2) NOT NULL,
  `product_old_price` decimal(7,2) DEFAULT NULL,
  `product_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `brand_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `product_stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_name`, `product_metaphone`, `product_price`, `product_old_price`, `product_created_at`, `brand_id`, `category_id`, `product_stock`) VALUES
(45, '  Telefon mobil Samsung Galaxy S21, Dual SIM, 128GB, 8GB RAM, 5G, Phantom Pink', 'TLFNMBLSMSNKKLKSSTLSMKBKBRMKFNTMPNK', '3299.99', '4099.99', '2021-05-13 19:47:59', 1, 3, 15),
(46, 'Telefon mobil Samsung Galaxy S21 Plus, Dual SIM, 128GB, 8GB RAM, 5G, Phantom Black', 'TLFNMBLSMSNKKLKSSPLSTLSMKBKBRMKFNTMBLK', '3799.99', '5099.99', '2021-05-13 19:48:54', 1, 3, 20),
(47, 'Telefon mobil Samsung Galaxy S20 FE, Dual SIM, 128GB, 6GB RAM, 5G, Cloud Orange', 'TLFNMBLSMSNKKLKSSFTLSMKBKBRMKKLTRNJ', '2799.99', '3599.99', '2021-05-13 19:50:04', 1, 3, 25),
(48, 'Telefon mobil Huawei P40 Lite E, Dual SIM, 64GB, 4G, Aurora Blue', 'TLFNMBLHWPLTTLSMKBKRRBL', '723.60', '840.00', '2021-05-13 20:08:42', 2, 3, 15),
(49, 'Telefon mobil Samsung Galaxy A21s, Dual SIM, 32GB, 4G, Prism Crush White', 'TLFNMBLSMSNKKLKSSTLSMKBKPRSMKRXHT', '740.18', '1011.50', '2021-05-17 12:57:55', 1, 3, 15),
(51, 'Telefon mobil Samsung Galaxy A20e, Dual SIM, 32GB, 4G, Black', 'TLFNMBLSMSNKKLKSTLSMKBKBLK', '674.73', '773.50', '2021-05-17 14:51:58', 1, 3, 2),
(52, 'Telefon mobil Samsung Galaxy A71, Dual SIM, 128GB, 6GB RAM, 4G, Blue', 'TLFNMBLSMSNKKLKSTLSMKBKBRMKBL', '1739.78', '2142.00', '2021-05-17 16:03:13', 1, 3, 7),
(53, 'Telefon mobil Samsung Galaxy A51, Dual SIM, 128GB, 4GB RAM, 4G, Prism Black', 'TLFNMBLSMSNKKLKSTLSMKBKBRMKPRSMBLK', '1409.99', '1799.99', '2021-05-17 16:06:42', 1, 3, 8),
(54, '  Telefon mobil Samsung Galaxy S21 Ultra, Dual SIM, 128GB, 12GB RAM, 5G, Phantom Black', 'TLFNMBLSMSNKKLKSSLTRTLSMKBKBRMKFNTMBLK', '5469.00', '5500.00', '2021-05-17 16:54:23', 1, 3, 30),
(57, 'Telefon mobil Huawei P Smart (2021), Dual SIM, 128GB, 4G, Crush Green', 'TLFNMBLHWPSMRTTLSMKBKKRXKRN', '719.00', '1149.99', '2021-05-17 17:30:51', 2, 3, 15),
(58, 'Telefon mobil Huawei P Smart (2021), Dual SIM, 128GB, 4G, Midnight Black', 'TLFNMBLHWPSMRTTLSMKBKMTNTBLK', '699.99', '1299.99', '2021-05-17 17:40:24', 2, 3, 12),
(59, 'Telefon mobil Huawei P40 Lite, Dual SIM, 128GB, 6GB RAM, 4G, Sakura Pink', 'TLFNMBLHWPLTTLSMKBKBRMKSKRPNK', '925.00', '1550.00', '2021-05-17 17:42:07', 2, 3, 9),
(60, 'Telefon mobil Huawei P40 Pro, Dual SIM, 256GB, 8GB RAM, 5G, Silver Frost', 'TLFNMBLHWPPRTLSMKBKBRMKSLFRFRST', '3209.99', '4599.99', '2021-05-17 17:45:07', 2, 3, 52),
(61, 'Telefon mobil Huawei P30 Lite, Dual SIM, 128GB, 4G, Peacock Blue', 'TLFNMBLHWPLTTLSMKBKPKKBL', '3299.99', NULL, '2021-05-17 17:47:20', 2, 3, 75),
(62, 'Telefon mobil Huawei Nova 5T, Dual SIM, 128GB, 6GB RAM, 4G, Midsummer Purple', 'TLFNMBLHWNFTTLSMKBKBRMKMTSMRPRPL', '1549.00', NULL, '2021-05-17 17:50:26', 2, 3, 45),
(63, 'Telefon mobil Huawei Y6P, Dual SIM, 64GB, 4G, Emerald Green', 'TLFNMBLHWPTLSMKBKMRLTKRN', '679.00', '899.00', '2021-05-17 21:14:31', 2, 3, 15),
(64, 'Telefon mobil Huawei P30 Pro, Dual SIM, 128GB, 6GB RAM, 4G, Breathing Crystal', 'TLFNMBLHWPPRTLSMKBKBRMKBR0NKKRSTL', '3199.00', NULL, '2021-05-17 21:16:07', 2, 3, 9),
(65, '  Telefon mobil Huawei Mate XS, Dual SIM, 512GB, 8GB RAM, 5G, Interstellar Blue', 'TLFNMBLHWMTKSSTLSMKBKBRMKNTRSTLRBL', '7399.00', '10999.00', '2021-05-17 21:17:54', 2, 3, 20),
(67, 'Telefon mobil Samsung Galaxy S10+, Dual SIM, 128GB, 8GB RAM, 4G, Prism White', 'TLFNMBLSMSNKKLKSSTLSMKBKBRMKPRSMHT', '3149.00', '3549.00', '2021-06-25 15:59:31', 1, 3, 15),
(68, 'Telefon mobil Samsung Galaxy A52, Dual SIM, 128GB, 6GB RAM, 4G, Black', 'TLFNMBLSMSNKKLKSTLSMKBKBRMKBLK', '1849.08', '2054.46', '2021-06-25 17:39:19', 1, 3, 20),
(69, ' Laptop Dell Inspiron 3793 cu procesor Intel&reg; Core&trade; i3-1005G1, 17.3&quot;, Full HD, 8GB, 256GB SSD, Ubuntu, Black', 'LPTPTLNSPRNKPRSSRNTLRKKRTRTKKTFLTKBKBSTBNTBLK', '2399.99', '2849.99', '2021-06-26 13:58:29', 4, 5, 15),
(70, '  Laptop 2 in 1 Dell Inspiron 5406 cu procesor Intel Core i5-1135G7, 14&quot;, Full HD, 8GB, 256GB SSD, Windows 10 Home, Grey', 'LPTPNTLNSPRNKPRSSRNTLKRKKTFLTKBKBSTWNTSHMKR', '3299.99', '4799.99', '2021-06-26 15:49:20', 4, 5, 20),
(71, ' Laptop Dell Vostro 3500 cu procesor Intel Core i5-1135G7, 15.6&quot;, Full HD, 4GB, 1TB HDD, Windows 10 Pro, Black', 'LPTPTLFSTRKPRSSRNTLKRKKTFLTKBTBTWNTSPRBLK', '3299.99', '3899.99', '2021-06-26 15:56:49', 4, 5, 35),
(74, 'Laptop ultraportabil Dell Latitude 3410 cu procesor Intel&reg; Celeron&trade; 5205U, 14&quot;, Full HD, 4GB, 128GB SSD, Ubuntu, Grey', 'LPTPLTRPRTBLTLLTTTKPRSSRNTLRKSLRNTRTKTFLTKBKBSTBNTKR', '1649.99', '2699.99', '2021-06-26 16:32:15', 4, 5, 15),
(75, '  Laptop Dell Alienware m15 R3, 15.6&quot; FHD cu procesor Intel Core i9-10980HK, 4.5 TB SSD', 'LPTPTLLNWRMRKTFTKPRSSRNTLKRKTBST', '9999.99', NULL, '2021-06-26 16:45:14', 4, 5, 25),
(76, '  Laptop Dell XPS 9700 cu procesor Intel&reg; Core&trade; i7-10875H, 17&quot;, UHD+, 32GB, 1TB SSD, Windows 10 Home', 'LPTPTLKSPSKPRSSRNTLRKKRTRTKTTKBTBSTWNTSHM', '8799.48', NULL, '2021-06-26 17:03:09', 4, 5, 2),
(77, 'Laptop Dell Latitude 3510, 15.6 inch Full HD, Intel Core i3-10110U, 8GB DDR4, 256GB SSD ,Win10 Pro', 'LPTPTLLTTTNXFLTNTLKRKBTRKBSTWNPR', '1798.88', '4282.01', '2021-06-26 17:11:09', 4, 5, 5);

-- --------------------------------------------------------

--
-- Table structure for table `product_descriptions`
--

CREATE TABLE `product_descriptions` (
  `id` int(11) NOT NULL,
  `product_description_title` text NOT NULL,
  `product_description_body` text NOT NULL,
  `product_description_image` varchar(100) DEFAULT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_descriptions`
--

INSERT INTO `product_descriptions` (`id`, `product_description_title`, `product_description_body`, `product_description_image`, `product_id`) VALUES
(1, 'Tot ce vrei, pentru a face tot ce iti place', 'Acesta este un telefonul pentru cei care isi doresc totul. V-am ascultat pe voi, fanii, iar ceea ce am creat este un telefon care nu accepta niciun compromis. Acesta este telefonul creat special pentru fanii de toate tipurile. Asa ca, indiferent daca esti fan al fotografiei, al jocurilor sau al transmiterii in feed-ul tau a tot ceea ce te inspira, iti oferim un telefon care contine tot ce poate fi mai bun in materie de inovatie din gama S20. Acesta este telefonul care iti ofera tot ce vrei, pentru a face cat mai mult din ceea ce iti place.', 'galaxy-s20-fe-cloud-orange-desc-1.png', 47),
(2, 'Nuante care vor starni gelozia curcubeului', 'elefonul nu iti paraseste mana aproape niciodata, asa ca trebuie sa se asorteze perfect stilului tau. Alege dintr-o gama larga de nuante in trend, cu un finisaj mat elegant, de la spectaculos si indraznet la subtil si clasic.', 'galaxy-s20-fe-cloud-orange-desc-2.png', 47),
(5, 'Toate privirile sunt indreptate spre ecranul Infin', 'Upgradeaza ceea ce vezi. Ecranul de 6.5\" Full HD Infinity-O Display are trei laturi abia vizibile ce inconjoara marginile plate si un foarte mic orificiu pentru camera. Asta inseamna un ecran mai captivant, care face gaming-ul, streaming-ul si apelurile video mult mai distractive.', 'galaxy-s20-fe-cloud-orange-desc-3.png', 47),
(6, 'Camera cu trei obiective, de tip profesional', 'Cele trei camere de pe partea din spate iti permit sa obtii cu usurinta acea fotografie profesionala, care nu are nevoie de filtre. Incadreaza scena cu camera Wide-Angle, apoi largeste imaginea mai mult cu camera Ultra Wide sau apropie imaginea folosind zoom-ul optic 3x al camerei Telephoto.', 'galaxy-s20-fe-cloud-orange-desc-4.png', 47),
(8, 'Stralucitor si protejat in toate modurile', 'Uimitor de luminos. Incredibil de realist. Surprinzator de fin - acest afisaj surprinde prin culori vibrante si o claritate uimitoare, oferind o experienta de vizionare de neegalat. Si asta chiar si in lumina puternica a soarelui. Urmatorul tau maraton de filme tocmai a devenit mai confortabil. Telefonul reduce in mod semnificativ presiunea si disconfortul resimtite la nivelul ochilor, astfel incat sa poti viziona confortabil emisiunile tale preferate dimineata, la pranz si noaptea.', 'galaxy-s21-phantom-pink-desc-2.png', 45),
(9, 'Creat pentru a descoperi epicul din fiecare zi', 'Nu vei mai rata niciodata fotografia perfecta. Conceput pentru a revolutiona filmarea si fotografierea cu o rezolutie cinematografica de peste 8K, astfel incat sa poti face fotografii epice chiar dintr-un clip video. 64MP, cel mai rapid cip al nostru si o baterie solida cu autonomie pentru intreaga zi. Lucrurile tocmai au luat o turnura epica.', 'galaxy-s21-phantom-pink-desc-1.png', 45),
(10, 'Design revolutionar', 'Un design al camerei foto nou si indraznet. Sistem de camere cu un contur bine definit, dotat cu lentile de top.', 'samsung-galaxy-s21-phantom-black-desc-1.png', 54),
(11, 'Afisaj bland cu ochii', 'Dynamic AMOLED 2X\r\nEste cel mai dinamic si luminos afisaj al unui smartphone Galaxy. Galaxy S21 Ultra 5G ofera cea mai uimitoare experienta a noastra la 1500 niti, cu un volum de culoare de 100%, pentru culori precise si realiste, chiar si in lumina soarelui.\r\n\r\n 	 \r\nProtectie pentru confortul ochilor\r\nGalaxy S21 Ultra 5G regleaza nivelul luminii albastre, pentru a-ti proteja ochii. Reducand lumina albastra daunatoare, telefonul reduce in mod semnificativ oboseala ochilor, astfel incat sa poti urmari cate filme doresti fara a avea apoi probleme cu somnul.\r\n\r\n 	 \r\nAfisaj Super Smooth 120 Hz\r\nEcranul cu cea mai lina derulare, pe care poti tine pasul cu toate fluxurile tale. Incredibil de rapid, acest ecran ofera tranzitii perfecte la fiecare atingere si optimizeaza rata de reimprospatare pe baza a ceea ce vezi - economisind bateria pentru o autonomie mai mare.\r\n\r\n 	 \r\nCompatibilitate S Pen\r\nPrimul stylus S Pen pentru Galaxy S iti aduce precizia de care aveai nevoie. Cu ajutorul tehnologiei Wacom, poti crea acum editari, retusuri si reglaje fine cu acest stylus cu latenta redusa. Profita la maximum de calitatile acestui ecran - indiferent daca alegi un S Pen sau un alt stylus compatibil cu tehnologia Wacom.', 'samsung-galaxy-s21-phantom-black-desc-2.png', 54),
(12, 'Cea mai dura sticla pentru ecrane', 'Conceputa pentru a se zgaria cat mai putin si a proteja cat mai bine atat fata, cat si spatele telefonului, aceasta este cea mai rezistenta versiune de Gorilla Glass utilizata vreodata pe un smartphone.', 'samsung-galaxy-s21-phantom-black-desc-3.png', 54),
(14, 'Realizeaza fotografii epice cu fiecare videoclip 8', '8K Video este cea mai inalta rezolutie a unui smartphone Samsung, ceea ce face ca filmarile tale sa arate chiar mai bine decat la cinematograf. Si cu 8K 24fps, fiecare vlog si amintire reprezinta urmatoarea ta sansa de a deveni celebru. Inregistreaza, incarca si vizioneaza direct pe YouTube. Apoi foloseste 8K Video Snap pentru a obtine un album cu imagini de 33MP de inalta calitate chiar din fiecare clip video de 8K. Este usor sa inregistrezi acum si sa trimiti un snap mai tarziu.', 'galaxy-s21-phantom-pink-desc-3.png', 45),
(15, 'Revolutia rezolutiei continua', 'Portretele nu au aratat niciodata mai frumoase. Realizeaza fotografii pregatite direct pentru postarea pe retelele de socializare, fara a efectua editari.', 'galaxy-s21-phantom-pink-desc-4.png', 45),
(21, 'Telefonul care nu doar iese in evidenta, dar se si distanteaza de celelalte.', 'Recreat complet pentru o experienta de vizionare neintrerupta. Fara margini care sa-ti distraga atentia. Ecranul elegant Infinity-O Display, decupat perfect cu laserul, cu securitate sporita si Dynamic AMOLED, este cel mai inovator ecran Galaxy de pana acum.', 's10-prism-white-desc-1.png', 67),
(22, 'Afisajul Infinity-O ofera o vedere cu adevarat neintrerupta.', 'Am eliminat elementele care te pot distrage, pentru o experienta de vizionare ca la cinematograf. Prin decuparea perfecta cu laserul, camera este incorporata discret in ecran, fara a afecta calitatea fotografiilor.', 's10-prism-white-desc-2.png', 67),
(23, 'Afisajul Cinema-Grade pe care trebuie sa-l vezi cu ochii tai.', 'Ecranul Dynamic AMOLED de generatie urmatoare este certificat HDR10+ si prevazut cu cartografiere dinamica a culorii, pentru culori uimitor de reale si contrast la fiecare cadru chiar si la cele intunecate. Iar ecranul mai luminos iti permite sa vezi totul si mai clar chiar si in lumina puternica a zilei. Impreuna cu difuzoarele stereo si Dolby Atmos, iti ofera o experienta cu adevarat imersiva.', 's10-prism-white-desc-3.png', 67),
(24, 'Conceput pentru a intoarce privirile', 'Cel mai fin ecran de derulare tine pasul cu toate fluxurile tale. Incredibil de receptiv, acest afisaj optimizeaza rata de improspatare pentru ceea ce faci cu fiecare atingere.', 'galaxy-s21-phantom-black-desc-1.png', 46),
(25, 'Dynamic AMOLED 2X', 'Uimitor de luminos. Incredibil de realist. Surprinzator de fin - acest afisaj surprinde prin culori vibrante si o claritate uimitoare, oferind o experienta de vizionare de neegalat. Si asta chiar si in lumina puternica a soarelui. Urmatorul tau maraton de filme tocmai a devenit mai confortabil. Telefonul reduce in mod semnificativ presiunea si disconfortul resimtite la nivelul ochilor, astfel incat sa poti viziona confortabil emisiunile tale preferate dimineata, la pranz si noaptea.', 'galaxy-s21-phantom-black-desc-2.png', 46),
(26, 'Revolutia video incepe aici', '8K Video este cea mai inalta rezolutie a unui smartphone Samsung, ceea ce face ca filmarile tale sa arate chiar mai bine decat la cinematograf. Si cu 8K 24fps, fiecare vlog si amintire reprezinta urmatoarea ta sansa de a deveni celebru. Inregistreaza, incarca si vizioneaza direct pe YouTube. Apoi foloseste 8K Video Snap pentru a obtine un album cu imagini de 33MP de inalta calitate chiar din fiecare clip video de 8K. Este usor sa inregistrezi acum si sa trimiti un snap mai tarziu.', 'galaxy-s21-phantom-black-desc-3.png', 46),
(27, 'Intreaga scena pe ecranul tau', 'Cu un afisaj infinity-V HD+ de 5.8&quot; poti vedea fiecare detaliu al continutului tau. Cel mai mare raport de afisaj, 19.5:9, iti permite sa te bucuri de jocuri si sa vezi si mai multe emisiuni preferate.', 'a20e-black-desc-1.png', 51),
(28, 'Este elegant si vine intr-o gama variata de culori', 'Suplu, de numai 8.4 mm, Galaxy A20e este confortabil in utilizarea cu o singura mana. Designul subtire si elegant include un scaner de amprenta mereu la indemana. Alege o nuanta potrivita stilului tau din variantele de negru, alb, albastru sau corai.', 'a20e-black-desc-2.png', 51),
(29, 'Camera duala pentru a surprinde mai multe', 'Galaxy A20e are o camera duala formata din camera principala de 13MP (F1.9) si o camera cu unghi ultra-larg de 5 MP. Cu un camp de vizualizare la un unghi de 123 de grade, la fel ca si ochiul uman, acesta poate surprinde mai mult in fiecare fotografie.', 'a20e-black-desc-3.png', 51),
(30, 'Ecran minunat, construit pentru cinema', 'Bucura-te de ecranul mare, fara margini, de 6.5 inci Infinity-O al lui Galaxy A21s. Urmareste videoclipurile tale preferate, jocurile si fluxurile live pe ecranul sau HD+.', 'a21s-prism-crush-white-desc-1.png', 49),
(31, 'Aspect elegant, confortabil de utilizat', 'Galaxy A21s are un finisaj lucios si holografic care atrage privirea. Curbele netede ale telefonului permit o priza usoara si sigura cand navighezi pe ecran. Alege dintre negru, alb, albastru sau rosu pentru a se potrivi stilului tau unic.', 'a21s-prism-crush-white-desc-2.png', 49),
(32, 'Patru camere foto minunate, pentru a captura mai mult', 'Camera foto principala are o rezolutie mare de 48MP perfecta pentru fotografii detaliate si clare pe timp de zi si noapte. Camera foto cu unghi Ultra Wide de 123&deg; 8MP surprinde mai mult din ceea ce vezi. Cu noua camera foto macro de 2MP fotografiile de aproape sunt extrem de rafinate. Iar cu efectele multiple ale camerei foto de profunzime subiectul iese mereu in evidenta.', 'a21s-prism-crush-white-desc-3.png', 49),
(33, 'Vezi intreaga priveliste cu Infinity-O Display', 'Optimizeaza simetria vizuala cu afisajul Infinity-O al Galaxy A51. Acum te poti juca, viziona, naviga si efectua mai multe activitati in acelasi timp, fara intrerupere, pe un ecran larg de 6,5&quot; FHD+, totul alimentat de tehnologia Super AMOLED. Bucura-te de o experienta extinsa pe un spatiu de ecran maximizat.', 'a51-prism-black-desc-1.png', 53),
(34, 'Proiectat pentru un nivel rafinat de stil si confort', 'Modelul prismatic al designului lui Galaxy A51 vine in nuante pastelate, netede si elegante, precum Prism Crush Negru, Alb si Albastru. Un finisaj lucios, premium adauga stilul perfect liniilor sale elegante si subtiri, fiind combinatia ideala intre stil si confortul utilizarii.', 'a51-prism-black-desc-2.png', 53),
(35, 'Quad Cam iti ofera mai multe optiuni pentru fotografie', 'Acceseaza o rezolutie foarte ridicata, utilizand camera principala de 48MP, pentru fotografii clare si detaliate zi si noapte. O camera cu unghi larg de 123&deg; si 12 MP incadreaza mai mult din imagine. Alege varianta imbunatatita Macro Cam de 5MP, pentru cadre apropiate, extrem de rafinate si asigura-te ca subiectul iese intotdeauna in evidenta, cu efectele multiple Live Focus ale camerei de adancime de 5MP.', 'a51-prism-black-desc-3.png', 53),
(39, 'Ecran minunat, derulare reala si cursiva', 'Bucura-ti privirea cu detalii vibrante, cu afisajul FHD+ Super AMOLED, ce ajunge la 800 de nits pentru claritate chiar si in lumina puternica a zilei. Eye Comfort Shield scade lumina albastra, iar Real Smooth pastreaza vizualizarea cursiva, indiferent daca te joci sau derulezi. Totul pe ecranul extins Infinity-O de 6.5 inci.', 'a52-prism-black-desc-1.png', 68),
(40, 'Stabilirea unui nou standard pentru un design uimitor', 'Descopera curbele confortabile si elegante de pe designul perfect al telefonului Galaxy A52. Carcasa minimalista a camerei se combina cu finisajul mat din partea din spate, pentru un aspect iconic, aproape monocorp.', 'a52-prism-black-desc-2.png', 68),
(41, 'Camera foto admirabila, intotdeauna clara si stabila', 'Sistemul de camere foto multi-obiectiv Galaxy A52 duce fotografiile la nivelul urmator. Foloseste rezolutia foarte ridicata a camerei foto principale, de 64MP, cu OIS pentru fotografii detaliate si clare, pe tot parcursul zilei. Extinde unghiul de vizualizare cu camera foto cu unghi foarte larg. Personalizeaza focalizarea cu camera foto de profunzime sau apropie-te de detalii cu camera foto macro.', 'a52-prism-black-desc-3.png', 68),
(42, 'Fa cunostinta cu ecranul cu rama mult mai mica si cu un spatiu de vizualizare mult mai mare', 'In spatele ecranului de 6,7&quot; Infinity-O Display, al Galaxy A71, tehnologia de culori Super AMOLED iti ofera nuante reale in tot ceea ce vizionezi si faci - de la jocuri si filme, la navigare web si multi-tasking. Poti sa incepi sa te bucuri mai mult de ceea ce iti place.', 'a71-black-1.png', 52),
(43, 'Culori pastelate captivante, asociate unui model dinamic', 'Prin designul sau neted, elegant, cu margini curbate, Galaxy A71 are un aspect frumos ce ti se potriveste confortabil in mana. Finisajul sau lucios, premium, il face usor de tinut, iar modelul sau regulat adauga o nota unica de personalitate.', 'a71-black-2.png', 52),
(44, 'Mai multe camere foto, pentru a captura mai mult din lumea ta', 'Indiferent daca momentul necesita un prim-plan, un cadru foarte larg, o fotografie pe timp de noapte sau o estompare artistica de tip Bokeh, A71 Quad Cam ofera o calitate si o usurinta in utilizare de nivel profesional. De la o camera foto principala de 64 MP, la o camera ultra larga de 123&deg; si 12 MP, o camera macro de 5 MP si una de profunzime de 5 MP, A71 este pregatit pentru orice moment.', 'a71-black-3.png', 52),
(47, 'Arta Flexibilitatii', 'Deschideti aripile cu designul Falcon Wing HUAWEI al lui HUAWEI Mate Xs. Datorita Design-ului unui, Falcon, cu o balamala inovatoare, HUAWEI Mate Xs prezinta o tehnologie inovatoare, care ofera o senzatie vizuala remarcabila. Pliat ca un smartphone elegant, se potriveste perfect in buzunar si palma. Puteti fi intotdeauna gata pentru sarcini din mers. Deschideti-l, puteti explora mai multe datorita ecranului imersiv cu dimensiuni duble, care ofera confort si usurinta in utilizare.', 'mate-xs-desc-1.png', 65),
(48, 'Vezi mai multe odata', 'HUAWEI FullView ofera detalii clare si culori vii oriunde te uiti, in timp ce ecranul remarcabilul-8 inci1 va permite sa vedeti mai multe simultan. Nu este nevoie sa derulati inainte si inapoi, peisajul uluitor, fotografii pline de emotii si infografice complete sunt dezvaluite in fata ochilor.', 'mate-xs-desc-2.png', 65),
(49, 'Gata intr-o secunda', 'Butonul de alimentare al lui HUAWEI Mate Xs este conceput pentru a integra tehnologia de recunoasterea a aprentei. Astfel, puteti apasa usor pe partea laterala pentru a porni si a debloca telefonul in siguranta intr-o secunda.', 'mate-xs-desc-3.png', 65),
(50, 'Culoare care nu trece neobservata', 'Culorile uluitoare, texturile nemaipomenite si designul reflector al telefonului HUAWEI nova 5T creeaza o senzatie de spatiu fara limite in care te cufunzi. Finisarea fina si textura unica accentueaza contrastul dintre lumini si umbre, oferind un efect 3D multi-layer fantastic, ca din alta lume, pe o suprafata plana.', 'nova-5t-desc-1.png', 62),
(51, 'Deblocheaza intr-o secunda', 'Senzorul de amprenta montat lateral accentueaza designul, in timp ce deblocheaza instant si usor tefefonul HUAWEI nova 5T, pentru o utilizare usoara, cu o singura mana. Nu pierde nicio secunda.', 'nova-5t-desc-2.png', 62),
(52, 'Frumusete dusa la extrem', 'HUAWEI duce la extrem designul smartphone-urilor, cu un raport chiar si mai mare intre ecran si corp pentru noul telefon HUAWEI nova 5T. Ascunzand camera frontala sub ecran, ecranul HUAWEI nova 5T isi pastreaza integritatea completa, revolutionand experienta utilizatorului.', 'nova-5t-desc-3.png', 62),
(53, 'HUAWEI Supercharge de 22.5W. Incarcare rapida', 'Echipat cu HUAWEI SuperCharge de  22.5 W, Huawei P smart 2021 iti  permite sa vizionezi videoclipuri pentru inca 2 ore cu doar 10 minute de incarcare, astfel inc&auml;t sa te poti bucura de un stil de viata fara reincarcari frecvente. ', 'p-smart-green-desc-1.png', 57),
(54, 'Baterie generoasa de 5000 mAh. Disctractie pe repeat', 'Bateria generoas&auml; de 5000 mAh colaboreaza cu algoritmul inteligent Al de economisire a energiei, oferindu-ti pana la 38.2 ore de apel 4G, 16.6 ore de redare video online 12 ore de navigare 4G pe internet. Distractia de durata este intotdeauna in jurul tau cu putere continua. ', 'p-smart-green-desc-2.png', 57),
(55, 'Camera Quad Al. Pregatit oricand sa explorezi ', 'HUAWEI P smart 2021 vine cu camere uimitoare Quad Al inregistreaza cu cele mai bune momente ale tale in timpul zilei si al noptii. De la lanturi muntoase extinse, repere indepartate, pana la scene de aproape, toate pot fi capturate de aceste camere uimitoare. ', 'p-smart-green-desc-3.png', 57),
(56, 'Camera principala de 48 MP. Detalii clare vii ', 'Camera principala de 48 MP te ajuta sa surprinzi momente de neuitat in detalii vii si ultra-clare. Indiferent daca este vorba de peisaje spectaculoase sau portrete uimitoare, poti vedea toate detaliile fine cu o claritate superioara. ', 'p-smart-green-desc-4.png', 57),
(57, 'HUAWEI Supercharge de 22.5W. Incarcare rapida', 'Echipat cu HUAWEI SuperCharge de  22.5 W, Huawei P smart 2021 iti  permite sa vizionezi videoclipuri pentru inca 2 ore cu doar 10 minute de incarcare, astfel inc&auml;t sa te poti bucura de un stil de viata fara reincarcari frecvente. ', 'p-smart-black-desc-1.png', 58),
(58, 'Baterie generoasa de 5000 mAh. Disctractie pe repeat', 'Bateria generoas&auml; de 5000 mAh colaboreaza cu algoritmul inteligent Al de economisire a energiei, oferindu-ti pana la 38.2 ore de apel 4G, 16.6 ore de redare video online 12 ore de navigare 4G pe internet. Distractia de durata este intotdeauna in jurul tau cu putere continua. ', 'p-smart-black-desc-2.png', 58),
(59, 'Camera Quad Al. Pregatit oricand sa explorezi ', 'HUAWEI P smart 2021 vine cu camere uimitoare Quad Al inregistreaza cu cele mai bune momente ale tale in timpul zilei si al noptii. De la lanturi muntoase extinse, repere indepartate, pana la scene de aproape, toate pot fi capturate de aceste camere uimitoare. ', 'p-smart-black-desc-3.png', 58),
(60, 'Camera principala de 48 MP. Detalii clare vii ', 'Camera principala de 48 MP te ajuta sa surprinzi momente de neuitat in detalii vii si ultra-clare. Indiferent daca este vorba de peisaje spectaculoase sau portrete uimitoare, poti vedea toate detaliile fine cu o claritate superioara. ', 'p-smart-black-desc-4.png', 58),
(61, 'Claritate exceptionala', 'Vedeti lumea mai clar, cu ajutorul senzorului de imagine cu cea mai mare rezolutie din industrie. Camera spate a dispozitivului HUAWEI Marie va permite sa realizati fotografii mai clare ca oricand, iar pana si cele mai mici detalii vor fi limpezi ca cristalul.', 'p30-blue-desc-1.png', 61),
(62, 'Cel mai nou zoom', 'Tehnologia zoom fara pierderi de calitate si hiper-esantionare a HUAWEI consolideaza obiectivul ultra high definition de 48 MP pentru a il transforma intr-un super obiectiv de zoom. Veti putea realiza fotografii incredibile de la distanta, comparabile cu cele realizate cu un obiectiv cu zoom optic 2x.', 'p30-blue-desc-2.png', 61),
(63, 'Frumusete in fiecare fotografie', 'Fiecare chip este diferit si unic. Tehnologia pentru selfie AI de la HUAWEI va infrumuseteaza fotografiile selfie in functie de forma si tipul unic al fetei. Tehnologia realizeaza un plan al conturului trasaturilor dumneavoastra si creeaza un algoritm personalizat pentru a asigura faptul ca va aratati in cea mai buna forma.', 'p30-blue-desc-3.png', 61),
(64, 'Vizualizare mai ampla, posibilitati mai extinse', 'Extindeti-va perspectiva cu obiectivul HUAWEI Marie cu unghi ultra larg de 120&deg; si\r\nimortalizati peisaje vaste in fotografii uimitoare din care nu scapa nimic. Fotografiati fara limite.', 'p30-blue-desc-4.png', 61),
(65, 'Pionier in domeniul fotografiei', 'Indrazneste sa impresionezi. Sistemul de patru camere foto Leica se preteaza la toate tipurile de fotografii, dezvaluindu-ti lumea in intregime. Acest sistem de camere foto fara egal, care include un obiectiv SuperZoom, o camera supersensibila de 40 MP, un obiectiv cu unghi ultra-larg de 20 MP si o camera foto TOF HUAWEI iti da libertatea sa captezi momentele cele mai incredibile.', 'p30-crystal-desc-1.png', 64),
(66, 'Mai aproape de lucrurile pe care le indragesti', 'Noul obiectiv telefotografic cu periscop permite incorporarea unor capacitati de zoom optic sporite intr-un corp compact, fara a pierde din calitatea imaginii. Alaturi de saturatia culorilor oferita de camera foto principala de 40 MP si stabilitatea oferita de OIS si AIS, obiectivul SuperZoom ofera zoom hibrid 10x, pentru a vedea ce nu s-a mai vazut pana acum, la o rezolutie excelenta si cu detalii impresionante. De asemenea, iti aduce luna chiar in fata ochilor, cu un zoom de pana la 50x.', 'p30-crystal-desc-2.png', 64),
(67, 'Ilumineaza fiecare moment', 'HUAWEI rescrie regula perceptiei culorilor, transformand RGB-ul in RYB, pentru mai multa luminozitate in toate imaginile tale. Combinatia consolidata intre senzorul HUAWEI SuperSpectrum, ISP-ul Kirin 980 si algoritmul auto-dezvoltat creste luminozitatea cu 40%, pentru ca tu sa poti pastra amintiri clare, atat de pe timpul zilei, cat si de pe timpul noptii.', 'p30-crystal-desc-3.png', 64),
(68, 'Vezi ce se ascunde in intuneric', 'Capteaza splendorile ascunse ale noptii cu pana la  ISO 409,600 pe HUAWEI P30 Pro. Chiar si in situatii de intuneric extrem, vei putea capta momentele frumoase, cum ar fi o cina romantica la lumina lumanarilor sau dansul licuricilor prin tufisuri.', 'p30-crystal-desc-4.png', 64),
(69, 'Design fantastic, plin de culoare', 'Inspirat de jocul luminii, alaturi de tehnologia cu nano-textura, HUAWEI P40 lite E prezinta un uluitor efect 2.5D cu refractia luminii pe spate, exact ca o usa plina de culoare deschisa spre spatiul infinit.', 'p40-blue-desc-1.png', 48),
(70, 'Display Punch FullView', 'Cu un Display Punch FullView 6,39&rdquo;, telefonul HUAWEI P40 lite E ofera o imagine vasta cu un raport 90,15% intre ecran si corp pentru o experienta profunda. Tehnologia inovatoare blind hole de la HUAWEI acopera eficace camera frontala incorporata in ecran, care conduce la o diafragma mai mica si mentine integritatea ecranului, astfel incat sa asigure o experienta optima a utilizatorului, cu intreruperi minime.', 'p40-blue-desc-2.png', 48),
(71, 'Mod nocturn portabil', 'Acum poti face poze pe timp de noapte luminoase si clare fara trepied. Imbinand tehnologia de stabilizare AI si cel mai lung timp de expunere de 6 secunde,6 HUAWEI P40 lite E poate surprinde clar orice detaliu intr-un mediu slab luminat.', 'p40-blue-desc-3.png', 48),
(72, 'Camera tripla AI 48 MP', 'HUAWEI P40 lite E este studioul tau foto personal cu 3 camere inteligente pe spate. Camera principala de 48 MP, o camera cu unghi Ultra Wide de 8 MP si o camera cu senzor de profunzime de 2 MP pun in evidenta toate detaliile fine si claritatea si iti permit sa vezi mai mult, mai departe si mai clar.', 'p40-blue-desc-4.png', 48),
(73, 'Fii creativ cu Quad Camera', 'Lumea este plina de frumusete si de minunatii care asteapta sa fie descoperite de tine. Cu 4 camere pe spate, HUAWEI P40 lite face fotografii ample, mai clare si mai apropiate decat ti-ai fi putut imagina. Fa portrete cinematice cu obiectivul bokeh, apoi comuta la obiectivul macro si fa pe loc fotografii super-detaliate ale naturii. Toate acestea cu acelasi telefon. Parca ai avea un studio profesional in buzunar.', 'p40-pink-desc-1.png', 59),
(74, 'Frumusetea consta in detalii', 'Noi nu iti putem spune cand se va ivi urmatoarea ta ocazie de fotografiere, pe care nu trebuie sa o ratezi. Dar, cu o camera principala de 48 MP, poti fi sigur ca atunci cand apare vei surprinde fiecare aspect cu detalii cinematice uluitoare. In modul 48 MP AI Ultra Clarity, camera imbina cu abilitate cadre multiple intr-o singura imagine de inalta definitie, asa ca nu vei pierde niciun detaliu, chiar daca te apropii rapid.\r\n', 'p40-pink-desc-2.png', 59),
(75, 'Petrece pe timp de noapte', 'Diafragma mare f/1.8 si senzorul mai mare 1/2 inch au fost concepute pentru a captura mai multa lumina, asa ca nu trebuie sa te opresti din pozat chiar daca apune soarele. Datorita tehnologiei HUAWEI AI Image Stabilization, modul Handheld Super Night isi croieste drum prin zgomotul de fundal si iti ofera o mai mare plaja dinamica pentru a obtine fotografii mai clare.', 'p40-pink-desc-3.png', 59),
(76, 'Extinde-ti viziunea', 'Surprinde mai mult din toate. Cu un obiectiv cu unghi Ultra Wide 120&deg; , obtii o vedere mai buna a lucrurilor care te fascineaza, iar lungimea focala de 17 mm surprinde cu 140% mai mult din peisaj. Asta inseamna mai mult neon in peisajele citadine, mai multi prieteni in pozele de grup si mai multa natura in peisajele tale.', 'p40-pink-desc-4.png', 59),
(77, 'Minunea fluida din mainile tale', 'Inspirat de frumusetea si forma apei curgatoare, ecranul Quad-Curve Overflow este creat pentru a dizolva barierele imaginii si ale imaginatiei pe fiecare margine. In plus, datorita ratei de reimprospatare de 90 Hz, va veti bucura de vizualizarea imersiva pe tot ecranul fluid. Cadrul de montare plasat pe mijloc si colturile rotunde de protectie imbunatatesc senzatia armonioasa pentru ochi si maini.', 'p40-silver-desc-1.png', 60),
(78, 'Cuprinde eleganta in profunzime', 'Reflectand puritatea naturii, HUAWEI P40 Pro vine in culorile Deep Sea Blue, Ice White, Black, Blush Gold and Silver Frost. Finisajul mat refractant accentueaza un sentiment eteric de profunzime care dezvaluie eleganta si pacea interioara in fiecare nuanta.', 'p40-silver-desc-2.png', 60),
(79, 'Exploreaza lumea. Creati-ti propriile povesti', 'Nu inceta niciodata sa explorezi viata si sa creezi povesti. Functionand ca un sistem extrem de unitar, sistemul de camere Penta/Quad/Triple Ultra Vision Leica va ajuta permanent sa fotografiati pe timp de zi sau de noapte, indiferent daca subiectul este aproape sau la distanta. Capturati fara efort ceea ce vedeti si lasati imaginea sa redea ceea ce simtiti.', 'p40-silver-desc-3.png', 60),
(80, 'Toata ziua. Vizualizare completa. Super definitie', 'Senzorul lider in industrie de 1/1.28 inchi, cu pixeli foarte mari de 2.44 &mu;m, este de acum disponibil pe un smartphone. In plus, matricea de filtre color RYYB aduce lumina masiva, interval dinamic ridicat si reduce noise-ul. Beneficiind de gruparea pixelilor 4 in 1 si Octa PD Autofocus, camera foto principala de 50 MP redefineste filmarea la super claritate cu detalii precise, indiferent de complexitatea scenei si conditiile de lumina. HUAWEI XD Fusion Engine beneficizaa de ISP si NPU actualizate si este pe deplin capabil sa proceseze rapid cantitatea uriasa de informatii si sa sporeasca claritatea extraordinara la nivel de pixel pentru fiecare imagine, zi sau noapte.', 'p40-silver-desc-4.png', 60),
(81, 'Display Dewdrop de 6.3 inci', 'Cu un Afisaj Dewdrop de 6.3&quot;, telefonul ofera o imagine vasta cu un raport 88,4% intre ecran si corp pentru o experienta vizuala profunda.Cu diametrul de 2.65 mm, camera frontala mica si discreta, conduce la o diafragma mai mica si mentine integritatea ecranului, astfel incat sa asigure o experienta grafica optima utilizatorului, precum si imagini fantastice, cu intreruperi minime.', 'y6p-green-desc-1.png', 63),
(82, 'Stralucire si joc de lumini', 'Cu un strat special si maiestrie desavarsita, partea din spatele telefonului straluceste in curbe splendide sub diverse unghiuri de umbra si lumina, punandu-i in valoare eleganta din orice perspectiva.', 'y6p-green-desc-2.png', 63),
(83, 'Baterie capacitiva de 5.000 mAh', 'Sustinut de bateria puternica de 5.000 mAh, smartphone-ul poate face fata tuturor task-urile tale zilnice fara incarcari frecvente. De asemenea, HUAWEI Y6p poate fi utilizat ca si un incarcator pentru alte telefoane fara mult efort! In plus, modul Back Up iti ofera posibilitatea de back up two-way pentru date si fotografii pentru device-urile Android.', 'y6p-green-desc-3.png', 63),
(84, 'Sistem Triplu de camere', 'Echipat cu camere inteligente, camera principala de 13 MP, o camera cu unghi Ultra Wide de 5 MP si o camera cu senzor de profunzime de 2 MP, acestea pun in evidenta toate detaliile fine si claritatea imaginilor tale.', 'y6p-green-desc-4.png', 63),
(85, 'Noul dvs. computer de acasa', 'Ecranul mare este excelent pentru a viziona filme in familie, in timp ce tastatura numerica face intocmirea bugetului floare la ureche. Mutati-va de la masuta de cafea la birou si apoi la masa din sufragerie, dupa bunul plac.\r\n', 'dell-inspiron-3793-desc-1.png', 69),
(86, 'Valorificati la maximum fiecare zi', 'Procesoare capabile: procesoarele Intel&reg; asigura o viteza de reactie incredibila si multitasking lin si fara probleme.\r\n\r\nMemorie si capacitate de stocare mari: comutati cu usurinta intre aplicatiile deschise, cu memoria de 8GB. Detineti controlul asupra fisierelor cu SSD-ul cu capacitate de stocare de 256GB.\r\n\r\nEcran impresionant: afisajul antireflex FHD ofera o imagine clara, luminoasa, care nu oboseste ochii.', 'dell-inspiron-3793-desc-2.png', 69),
(87, 'Flexibil pe masura necesitatilor', 'O gama larga de porturi: conectati-va la televizor sau la monitor prin intermediul portului HDMI, descarcati fotografii folosind slotul pentru carduri SD si beneficiati de viteze mari de transfer de la toate accesoriile datorita celor doua porturi USB 3.1 din prima generatie.\r\n\r\nTastatura numerica: alocarea bugetului si alte calcule sunt floare la ureche datorita tastaturii numerice.', 'dell-inspiron-3793-desc-3.png', 69),
(88, 'Un 2 in 1 care traieste pentru divertisment', 'O vizualizare mai buna: bucurati-va de flexibilitatea tehnologiei cu unghi larg de vizualizare (WVA), care le permite tuturor sa se adune in jurul ecranului pentru a vedea cel mai recent videoclip viral.\r\n\r\nAfisaj fascinant: vizualizati continutul in stil. Un afisaj FHD este incorporat in borduri inguste, avand drept rezultat un raport ecran/corp extins si o experienta incantatoare de vizualizare.\r\n\r\nMai multe moduri: alegeti modul care se potriveste cel mai bine cu preferintele dvs. de vizualizare si cu stilul de viata hiperactiv. Incercati modul cort sau modul suport in avion sau cand ii lasati pe copii sa se uite la desene animate la masa din bucatarie. Modul tableta face vizionarea mai usoara ca niciodata atunci cand stati intinsi, iar modul laptop traditional va permite sa luati usor o pauza pentru a va verifica paginile de socializare sau pentru a naviga pe internet. \r\n\r\nConectivitate pe care va puteti baza: cu noul protocol wireless optional 802.11 AX, numit si WIFI 6, vitezele de transfer prin Wi-Fi, acoperirea si fiabilitatea laptopului Inspiron 2 in 1 sunt mai mari ca oricand in cafenelele aglomerate si in alte zone cu trafic intens. Va veti bucura si de o acoperire mai mare a hotspoturilor.', 'dell-inspiron-5406-desc-1.png', 70),
(89, 'Petreceti-va timpul mai bine', 'Confidentialitatea conteaza: Petreceti-va ziua fara griji. Noua noastra camera cu oblon de protectie a confidentialitatii va protejeaza impotriva oricarei persoane care v-ar putea invada intimitatea.', 'dell-inspiron-5406-desc-2.png', 70),
(90, 'Super culori. Confort contemporan', 'Revigorant si rafinat: bucurati-va de un design curat al suportului pentru maini, cu orificii de ventilare incorporate in balamale si cu butonul de alimentare incorporat in tastatura.\r\n\r\nAcces simplu: porniti laptopul pur si simplu deschizand capacul si conectati-va folosind doar atingerea. Chiar si cand este in hibernare sau inchis, senzorul pentru capac deschis porneste laptopul imediat ce il deschideti. \r\n\r\nLuminati-va lumea: vedeti in intuneric cu o tastatura cu retroiluminare, care va permite sa tastati cu usurinta in setari de lumina slaba, de exemplu atunci cand va gasiti continutul de streaming preferat noaptea tarziu in pat sau atunci cand calatoriti noaptea cu avionul.', 'dell-inspiron-5406-desc-3.png', 70),
(91, 'Bucurati-va de productivitate neintrerupta', 'Ecran optimizat: panoul FHD ofera mai multa luminozitate si culori vii, pentru o experienta imbunatatita de vizualizare, iar datorita cadrului ingust pe doua laturi vedeti mai mult continut cu mai putine intreruperi.\r\n\r\nExpressCharge&trade;: duceti nivelul de incarcare a bateriei de la 0 la 80 % in interval de o ora, astfel incat sa nu depindeti de priza atunci cand lucrati in timpul deplasarilor.\r\n\r\nProcesare puternica: faceti fata zilei de lucru cu ajutorul procesoarelor Intel&reg; Core&trade; de pana la a 11-a generatie.\r\n\r\nFisiere la indemana: Stocati toate documentele importante pentru acces simplu, cu HDD de 1TB.', 'dell-vostro-3500-desc-1.png', 71),
(92, 'Design pe care va puteti baza', 'Calatoriti light: incepand de la 1,98 kg si cu o grosime de pana la 20 mm, noul Vostro imbunatatit de 15&quot; din seria 3500 este pregatit sa va insoteasca oriunde.\r\n\r\nO multime de porturi: laptopul dvs. este echipat cu o gama larga de porturi si un cititor de carduri SD, ca sa ramaneti conectat la ceea ce conteaza cel mai mult pentru dvs.\r\n\r\nTastatura numerica: lucrati mai rapid cu o tastatura numerica cu 10 taste si cu o tasta de calculator care populeaza un calculator printr-o singura atingere.', 'dell-vostro-3500-desc-2.png', 71),
(96, 'Mai mic. Mai subtire. Mai inteligent.', 'Cel mai mic laptop de 14&rdquo; din lume are o camera web inovatoare pentru videoconferinte fara intreruperi, de inalta calitate, la care se adauga cele mai recente procesoare Intel&reg; si aplicatia Dell Optimizer.', 'dell-latitude-3410-desc-1.png', 74),
(97, 'PC-ul dvs. va cunoaste?', 'Dell Optimizer este o platforma IA de tip unic, care invata cum lucrati si se adapteaza continuu stilului dvs., pentru a crea o experienta mai inteligenta, mai personalizata si mai productiva.\r\n\r\nExpressResponse: utilizam functia incorporata IA si tehnologia Intel&reg; Adaptix&trade; pentru a regla nivelul de performanta atunci cand aveti mai mare nevoie de aceasta.\r\n\r\n \r\n\r\nExpressCharge: functia IA imbunatateste performanta bateriei prin adaptarea la consumul tipic de energie si la modelele de incarcare. Sunteti mereu pe drum? Beneficiati de ExpressCharge Boost pentru a obtine o incarcare la un nivel de 35 % in aproximativ 20 de minute. Aveti mai mult timp? ExpressCharge incarca automat bateria pana la un nivel de 80 % intr-o ora. Iar daca nu va puteti incarca sistemul imediat, acesta regleaza subtil setarile pentru a conserva resursele, cum ar fi reducerea iluminarii ecranului sau dezactivarea functiei Bluetooth atunci cand nu o utilizati.\r\n\r\nIntelligent Audio: functia Intelligent Audio de la Dell Optimizer va va regla automat sistemul prin ajustarea zgomotului de fundal, gestionarea volumului de vorbire si rafinarea experientei generale de sunet, astfel incat sa puteti auzi si sa fiti auzit mai bine, indiferent unde lucrati.', 'dell-latitude-3410-desc-2.png', 74),
(98, 'Un nivel superior pentru fiecare lucrator', 'Design uimitor: noul laptop Latitude 3410 este mai mic si mai subtire, cu finisaj mai deschis la culoare si cadru ingust pentru ecran, ceea ce va ofera mai mult spatiu de lucru.\r\n\r\nConectati-va oriunde: lucrati fara probleme in timpul deplasarilor gratie caracteristicii optionale de banda larga mobila, cu viteze de pana la 450 Mb/s.\r\n\r\nPorturi pentru toate situatiile: dispozitivul este compatibil cu mai multe monitoare si accesorii, gratie unei game complete de porturi disponibile, printre care se numara USB Type-C&trade; si porturi de generatie veche, cum ar fi HDMI si RJ-45.\r\n\r\nPerformanta rapida: procesoarele Intel&reg; Celeron ofera intreprinderilor performantele, capacitatea de administrare, caracteristicile de securitate integrate si stabilitatea arhitecturii Intel&reg;, asigurand alinierea la o foaie de parcurs de viitor. ', 'dell-latitude-3410-desc-3.png', 74),
(99, 'S-A NASCUT O NOUA LEGENDA', 'Cu o greutate incepand de la 4,65 lb., cu o grosime sub 20,5 mm, 360,3 mm latime si 276,2 mm lungime, noul Alienware m15 este suplu si puternic. Proiectat de la zero, m15 are materiale din aliaj de magneziu de calitate superioara, care ofera economii in greutate, reducand in acelasi timp grosimea si asigurand un sasiu mai rigid, robust, totul cu o estetica eleganta. Aceasta generatie Alienware m15 include un invelis imbunatatit al suprafetei, proiectat pentru a reduce urmele de amprente si alte pete tipice, fara a schimba nuanta sau culoarea. Aceasta solutie rezistenta la patare este o High Performance Clear Coat &ndash; o formula care va permite sa simtiti aliajul de magneziu rece si rezistent din strategia noastra premiata de culori cu contrast ridicat. Disponibil in culorile Lunar Light sau Dark Side of the Moon.', 'dell-alienware-desc-1.png', 75),
(100, 'Renastere in forta: Cu procesoare de pana la Intel&reg; Core&trade; i9K din a 10-a generatie, care permit pana la 8 nuclee si 16 fire de performanta cu mai multe fire, noul Alienware m15 isi depaseste predecesorul.', 'ADVANCED ALIENWARE CRYO-TECH\r\n\r\nCea mai recenta tehnologie termica a noastra, Advanced Alienware Cryo-Tech, este o abordare de proiectare in care performanta in jocuri a sistemului Alienware nu este niciodata compromisa prin metode electrice si mecanice, mentinand totodata stabilitatea sistemului in cele mai inalte stari de performanta. Acest lucru este gestionat cu ajutorul metodelor precum, si fara a se limita la acestea, disiparea caldurii prin designuri creative ale modulelor termice, designul ventilatorului si al motoarelor ventilatorului, precum si prin configuratia evacuarii si admisiei aerului si a impedantei generice a fluxului de aer. De asemenea, aceasta generatie a fost modernizata cu o crestere de 9 mm a diametrului in cazul lamelor de ventilator de pe CPU si o crestere de 4 mm a diametrului la lamele ventilatorului de pe GPU. In plus, noul m15 ofera un flux de aer imbunatatit prin directionarea aerului mai rece spre cele mai sensibile nuclee ale sistemului.\r\n\r\nDatorita tuturor imbunatatirilor de ultima generatie, va puteti astepta la o eficienta energetica crescuta si la viteze mai mari pentru perioade mai lungi de timp. Iata o vedere mai detaliata asupra solutiei noastre inovatoare de racir', 'dell-alienware-desc-2.png', 75),
(101, 'Radiator lamelar din cupru dens', 'Noul m15 are cea mai mare cantitate de material din cupru, in functie de greutate, dedicata furnizarii de disipare a caldurii pentru componentele de baza, fata de anteriorul m15. Noul m15 a crescut si dimensiunea tevilor de caldura cu 40 %, pentru a mari suprafata generala si disiparea caldurii.', 'dell-alienware-desc-3.png', 75),
(102, 'Creati cu putere colosala', 'Simtiti puterea: procesoarele Intel&reg; Core&trade; de inalta performanta, din a 10-a generatie, si placa grafica NVIDIA&reg; alimenteaza cele mai intense activitati creative.\r\n\r\nCreativitate de calibru desktop intr-un laptop: plin de performante uimitoare, de obicei disponibile numai pentru desktopuri, procesoarele Intel&reg; Core&trade; din a 10-a generatie aduc creativitatea de calibru desktop pe laptopul dvs. Cu procesoare de pana la i7, cu 8 nuclee si 16 fire, procesoarele Intel&reg; Core&trade; din a 10-a generatie va ajuta sa va captati, sa va editati si sa va partajati creatiile mai rapid ca oricand. Conceput pentru performanta si portabilitate, astfel incat sa puteti merge oriunde va duce viziunea.\r\n\r\nCreati continut de generatie urmatoare: XPS 17 cu GPU GeForce RTX are functie de trasare a razelor, inteligenta artificiala si hardware video pentru crearea de continut de generatie urmatoare. Nucleele dedicate pentru trasarea razelor redau scene frumoase, cu iluminare, umbre si reflexii exacte. Nucleele dedicate bazate pe inteligenta artificiala sunt folosite pentru activitati creative repetitive, care consuma timp, cum ar fi resincronizarea video, imbunatatirea imaginii, potrivirea culorilor, etichetarea fetei si transferul de stiluri. Iar hardware-ul video dedicat permite codificarea si decodarea rapida, de inalta calitate, pentru editare video si redare in flux live.\r\n\r\nViteza si memorie: gestionati sarcinile de lucru intense cu ajutorul memoriei de pana la 64 GB si cu wireless de pana la 3 ori mai rapid cu Killer&trade; AX1650 construite pe chipset Intel WiFi6.\r\n\r\nDesign termic avansat: XPS 17 ofera performanta puternica intr-un factor de forma incredibil de subtire. Placa grafica separata optionala are un numar unic de ventilatoare cu iesiri duale opuse, care maresc fluxul de aer de ventilare cu aproximativ 30 % si conduc fluxul de aer de racire in ambele directii, avand drept rezultat un flux de aer mai mare si temperaturi imbunatatite ale pielii. Dezvoltarea de catre Dell a ventilatorului cu iesiri duale opuse a avut ca rezultat mai multe solicitari de brevete si emiterea a cel putin un brevet. O camera de vapori masiva se intinde pe intreaga latime a laptopului, oferind o capacitate si mai mare de disipare a caldurii, ajutandu-va sa pastrati laptopul rece si sa obtineti o putere turbo mai mare', 'dell-xps9700-desc-1.png', 76),
(103, 'Creati cu culori', 'Ecran uimitor: Afisajul InfinityEdge redefinit permite plasarea optima a camerei si un afisaj de 16:10 cu o vizualizare uimitoare, fara borduri. In plus, cu 921k mai multi pixeli pe UHD+, veti fi mai productiv ca oricand.\r\n\r\nAfisaj de neegalat: profitati la maximum de gama dinamica superioara a continutului HDR cu tehnologia Dolby Vision&trade;, pentru a reda culori nemaivazute pe afisajele SDR ale PC-urilor. Tehnologia Dolby Vision ofera accente de pana la 40 de ori mai luminoase si nuante de negru de pana la 10 ori mai intunecate. In plus, afisajul uimitor DisplayHDR&trade; de 500 niti cu certificare VESA de pe ecranul optional 4K+ permite peste 16.000.000 de culori, cu o profunzime si o dimensiune mai mare ca oricand.\r\n\r\nVedeti fiecare detaliu: afisajul optional tactil cu rezolutie Ultra HD+ 4K (3840x2400) ofera precizie absoluta pentru toate necesitatile dvs. de calcul. Vedeti detaliile fiecarui pixel din fotografii fara sa mariti sau vedeti mai mult continut in timp ce navigati pe web.\r\n\r\nCuloare care iese in evidenta: echipat cu o gama cromatica Adobe RGB de 100 % si DCI-P3 de 94 %, ecranul ofera culori saturate, in timp ce un raport de contrast de 1650:1 va permite sa vedeti cele mai stralucitoare zone luminoase si cele mai intunecate zone obscure. Iar luminozitatea de 500 niti ofera mai multa claritate in lumina stralucitoare, cum ar fi in aer liber, in timp ce un strat antireflex de 0,65 % opreste reflexiile ecranului stralucitor.\r\n\r\nRelaxant pentru ochi: afisajul Eyesafe&reg; reduce lumina albastra daunatoare si mentine culoarea vie. Este primul ecran care gestioneaza inteligent energia luminoasa si sursa, reducand in mod selectiv lumina albastra daunatoare si dispersand-o in spectrul de lumina.', 'dell-xps9700-desc-2.png', 76),
(104, 'Dimensiuni uimitoare', 'Uimitorul afisaj InfinityEdge uimitor cu patru laturi permite un raport ecran/corp excelent (93,7 %) si un ecran de 17ʺ intr-un factor de forma de 15ʺ. De fapt, este mai mic decat 48 % dintre laptopurile de 15ʺ', 'dell-xps9700-desc-3.png', 76),
(105, 'Un nivel superior pentru fiecare lucrator', 'Laptop DELL Latitude 3510, 15.6&quot; FHD WVA (1920 x 1080) Anti-Glare Non- Touch, Camera si Microfon, Intel UHD for 10th Generation Placa video integrata, 10th Generation Intel Core i3-10110U (2 Core, 4M cache base 2.1GHz, up to 4.1GHz), 15.6&quot; LCD WLAN, 8GB,1x8GB, DDR4 Non-ECC, M.2 256GB PCIe NVMe Class 35 Solid State Drive, 65 Watt AC Adapter, 3 Cell 40Whr Baterie, WLAN Driver Intel AX201, CML /9260, KBL-R (with Bluetooth), Intel Dual Band Wi-Fi 6 AX201 2x2 802.11ax 160MHz + Bluetooth 5.1,Porturi:  1x RJ 45 10/100/1000 Mbps, 1x USB 3.2 Gen 1 Type-C port with DisplayPort alt mode/Power Delivery, 1x USB 3.2 Gen 1 Type-A port with PowerShare, 1x USB 3.2 Gen 1 Type-A port, 1x USB 2.0 Type-A port, 1x Universal Audio Jack, 1x HDMI 1.4 port, 1x Wedge shaped lock slot, 1x microSD 3.0 card slot, Dimensiuni :361.40 x 247.85 x 17.97 mm, Greutate: 1.79 kg, Windows 10 Pro 64bit', 'dell-latitude3510-desc-1.png', 77);

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `product_image` varchar(100) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`id`, `product_image`, `product_id`) VALUES
(260, 'telefon-mobil-samsung-galaxy-s21-phantom-black-2.png', 46),
(261, 'telefon-mobil-samsung-galaxy-s21-phantom-black-4.png', 46),
(262, 'telefon-mobil-samsung-galaxy-s21-phantom-black-1.png', 46),
(263, 'telefon-mobil-samsung-galaxy-s21-phantom-black-3.png', 46),
(264, 's21-cloud-orange-3.png', 47),
(265, 's21-cloud-orange-1.png', 47),
(266, 's21-cloud-orange-2.png', 47),
(267, 's21-cloud-orange-4.png', 47),
(268, 'huawei-p40-aurora-blue-4.png', 48),
(269, 'huawei-p40-aurora-blue-1.png', 48),
(270, 'huawei-p40-aurora-blue-2.png', 48),
(271, 'huawei-p40-aurora-blue-3.png', 48),
(272, 'samsung-a21s-prism-crush-white-1.png', 49),
(273, 'samsung-a21s-prism-crush-white-3.png', 49),
(274, 'samsung-a21s-prism-crush-white-4.png', 49),
(275, 'samsung-a21s-prism-crush-white-2.png', 49),
(280, 'samsung-a71-blue-1.png', 52),
(281, 'samsung-a71-blue-2.png', 52),
(282, 'samsung-a71-blue-3.png', 52),
(283, 'samsung-a71-blue-4.png', 52),
(284, 'samsung-a20e-black-2.png', 51),
(285, 'samsung-a20e-black-4.png', 51),
(286, 'samsung-a20e-black-3.png', 51),
(287, 'samsung-a20e-black-1.png', 51),
(288, 'samsung-a51-prism-black-1.png', 53),
(289, 'samsung-a51-prism-black-2.png', 53),
(290, 'samsung-a51-prism-black-4.png', 53),
(291, 'samsung-a51-prism-black-3.png', 53),
(292, 'samsung-s21-ultra.-phantom-black-1.png', 54),
(293, 'samsung-s21-ultra.-phantom-black-2.png', 54),
(294, 'samsung-s21-ultra.-phantom-black-3.png', 54),
(295, 'samsung-s21-ultra.-phantom-black-4.png', 54),
(300, 'huawei-p-smart-crush-green-4.png', 57),
(301, 'huawei-p-smart-crush-green-2.png', 57),
(302, 'huawei-p-smart-crush-green-3.png', 57),
(303, 'huawei-p-smart-crush-green-1.png', 57),
(304, 'huawei-p-smart-midnight-black-1.png', 58),
(305, 'huawei-p-smart-midnight-black-4.png', 58),
(306, 'huawei-p-smart-midnight-black-2.png', 58),
(307, 'huawei-p-smart-midnight-black-3.png', 58),
(308, 'huawei-p40-lite-sakura-pink-1.png', 59),
(309, 'huawei-p40-lite-sakura-pink-2.png', 59),
(310, 'huawei-p40-lite-sakura-pink-4.png', 59),
(311, 'huawei-p40-lite-sakura-pink-3.png', 59),
(312, 'huawei-p40-pro-silver-frost-3.png', 60),
(313, 'huawei-p40-pro-silver-frost-4.png', 60),
(314, 'huawei-p40-pro-silver-frost-2.png', 60),
(315, 'huawei-p40-pro-silver-frost-1.png', 60),
(316, 'huawei-p30-lite-peacock-blue-1.png', 61),
(317, 'huawei-p30-lite-peacock-blue-2.png', 61),
(318, 'huawei-p30-lite-peacock-blue-3.png', 61),
(319, 'huawei-p30-lite-peacock-blue-4.png', 61),
(320, 'huawei-nova-5t-midsummer-purple-1.png', 62),
(321, 'huawei-nova-5t-midsummer-purple-2.png', 62),
(322, 'huawei-nova-5t-midsummer-purple-4.png', 62),
(323, 'huawei-nova-5t-midsummer-purple-3.png', 62),
(324, 'huawei-y6p-emerald-green-1.png', 63),
(325, 'huawei-y6p-emerald-green-2.png', 63),
(326, 'huawei-y6p-emerald-green-3.png', 63),
(327, 'huawei-y6p-emerald-green-4.png', 63),
(328, 'huawei-p30-pro-breathing-crystal-1.png', 64),
(329, 'huawei-p30-pro-breathing-crystal-2.png', 64),
(330, 'huawei-p30-pro-breathing-crystal-3.png', 64),
(331, 'huawei-mate-xs-interstellar-blue-1.png', 65),
(332, 'huawei-mate-xs-interstellar-blue-2.png', 65),
(333, 'huawei-mate-xs-interstellar-blue-3.png', 65),
(334, 'huawei-mate-xs-interstellar-blue-4.png', 65),
(338, 's21-phantom-pink-2.png', 45),
(339, 's21-phantom-pink-4.png', 45),
(340, 's21-phantom-pink-3.png', 45),
(347, 'galaxy-s10-prism-white-1.png', 67),
(348, 'galaxy-s10-prism-white-2.png', 67),
(349, 'galaxy-s10-prism-white-3.png', 67),
(350, 'galaxy-s10-prism-white-4.png', 67),
(351, 'a52-prism-black-1.png', 68),
(352, 'a52-prism-black-5.png', 68),
(353, 'a52-prism-black-2.png', 68),
(354, 'a52-prism-black-3.png', 68),
(355, 'dell-inspiron-3793-1.png', 69),
(356, 'dell-inspiron-3793-2.png', 69),
(357, 'dell-inspiron-3793-3.png', 69),
(358, 'dell-inspiron-3793-5.png', 69),
(359, 'dell-inspiron-3793-4.png', 69),
(360, 'dell-inspiron-5406-1.png', 70),
(361, 'dell-inspiron-5406-3.png', 70),
(362, 'dell-inspiron-5406-2.png', 70),
(363, 'dell-vostro-3500-1.png', 71),
(364, 'dell-vostro-3500-3.png', 71),
(365, 'dell-vostro-3500-2.png', 71),
(366, 'dell-vostro-3500-5.png', 71),
(367, 'dell-vostro-3500-4.png', 71),
(374, 'dell-latitude-3410-1.png', 74),
(375, 'dell-latitude-3410-2.png', 74),
(376, 'dell-latitude-3410-4.png', 74),
(377, 'dell-latitude-3410-5.png', 74),
(378, 'dell-latitude-3410-3.png', 74),
(379, 'dell-alienware-1.png', 75),
(380, 'dell-alienware-5.png', 75),
(381, 'dell-alienware-2.png', 75),
(382, 'dell-alienware-4.png', 75),
(383, 'dell-alienware-3.png', 75),
(384, 'dell-xps9700-1.png', 76),
(385, 'dell-xps9700-3.png', 76),
(386, 'dell-xps9700-5.png', 76),
(387, 'dell-xps9700-4.png', 76),
(388, 'dell-xps9700-2.png', 76),
(389, 'dell-latitude3510-1.png', 77),
(390, 'dell-latitude3510-3.png', 77);

-- --------------------------------------------------------

--
-- Table structure for table `product_specifications`
--

CREATE TABLE `product_specifications` (
  `id` int(11) NOT NULL,
  `product_specification_key` varchar(100) NOT NULL,
  `product_specification_value` varchar(100) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_specifications`
--

INSERT INTO `product_specifications` (`id`, `product_specification_key`, `product_specification_value`, `product_id`) VALUES
(5, ' Tip telefon', 'Smartphone', 54),
(6, 'Sloturi SIM', 'Dual SIM', 54),
(7, 'Tip SIM', 'Nano SIM', 54),
(8, 'Sistem de operare', '	Android', 54),
(9, 'Numar nuclee', '8', 54),
(10, 'Model procesor', 'Exynos 2100', 54),
(11, 'Frecventa procesor', '2.9 GHz, 2.8 GHz, 2.2GHz', 54),
(12, 'Tehnologii', '2G, 3G, 4G, 5G', 54),
(13, 'Tip telefon', 'Smartphone', 45),
(14, 'Sloturi SIM', 'Dual SIM', 45),
(15, 'Tip SIM', 'Nano SIM, eSIM', 45),
(16, 'Sistem de operare', 'Android', 45),
(17, 'Numar nuclee', '8', 45),
(18, 'Model procesor', 'Exynos 2100', 45),
(19, 'Frecventa procesor', '2.8 GHz, 2.2GHz, 2.9GHz', 45),
(20, 'Tehnologii', '2G, 3G, 4G, 5G', 45),
(21, 'Conectivitate', 'Wi-Fi, Bluetooth, NFC, GPS, Incarcare wireless', 45),
(22, 'Continut pachet', 'Telefon, Cheia SIM, Cablu de date USB Type-C', 45),
(23, 'Culoare', 'Roz', 45),
(24, 'Dimensiune ecran', '6.2 inch', 45),
(25, 'Tip display', 'Dynamic AMOLED', 45),
(26, 'Rezolutie (pixeli)', '1080 x 2400', 45),
(27, 'Functii display', '120 Hz, 16 milioane de culori, 421 PPI', 45),
(28, 'Memorie interna', '128 GB', 45),
(29, 'Memorie RAM', '8 GB', 45),
(30, 'Conectivitate', 'Wi-Fi, Bluetooth, NFC, GPS, Incarcare wireless', 54),
(31, 'Continut pachet', 'Telefon, Cheia SIM, Cablu de date USB Type-C', 54),
(32, 'Culoare', 'Negru', 54),
(33, 'Dimensiune ecran', '6.8 inch', 54),
(34, 'Tip display', 'Dynamic AMOLED', 54),
(35, 'Rezolutie (pixeli)', '1440 x 3200', 54),
(36, 'Functii display', '120 GHz, 16 milioane de culori, 515 PPI', 54),
(37, 'Memorie interna', '128 GB', 54),
(38, 'Memorie RAM', '12 GB', 54),
(39, 'Tip telefon', 'Smartphone', 67),
(40, 'Sloturi SIM', 'Dual SIM', 67),
(41, 'Tip SIM', 'Nano SIM', 67),
(43, 'Sistem de operare', 'Android', 67),
(44, 'Versiune sistem de operare', 'Android 9.0 Pie', 67),
(45, 'Numar nuclee', '8', 67),
(46, 'Frecventa procesor', '2.7 GHz, 2.3 GHz, 1.9 GHz', 67),
(47, 'Tehnologii', 'GPRS, 2G, 3G, 4G', 67),
(48, 'Conectivitate', 'Wi-Fi, Bluetooth, NFC, GPS', 67),
(49, 'Continut pachet', 'Telefon', 67),
(50, 'Dimensiune ecran', '6.4 inch', 67),
(51, 'Tip display', 'AMOLED', 67),
(52, 'Rezolutie (pixeli)', '3040 x 1440', 67),
(53, 'Functii display', '19:9 ratio, 438 PPI', 67),
(54, 'Memorie interna', '128 GB', 67),
(55, 'Memorie RAM ', '8 GB', 67),
(56, 'Tip telefon', 'Smartphone', 46),
(57, 'Sloturi SIM', 'Dual SIM', 46),
(58, 'Tip SIM', 'Nano SIM, eSIM', 46),
(59, 'Sistem de operare', 'Android', 46),
(60, 'Numar nuclee', '8', 46),
(62, 'Model procesor', 'Exynos 2100', 46),
(63, 'Frecventa proesor', '2.8 GHz, 2.2 GHz, 2.9 GHz', 46),
(64, 'Tehnologii', '2G, 3G, 4G, 5G', 46),
(65, 'Conectivitate', 'Wi-Fi, Bluetooth, NFC, GPS, Incarcare wireless', 46),
(66, 'Culoare', 'Negru', 46),
(67, 'Dimensiune ecran', '6.7 inch', 46),
(68, 'Tip display', 'Dynamic AMOLED', 46),
(69, 'Functii display', '120 Hz, 16 milioane de culori, 394 PPI', 46),
(70, 'Memorie interna', '128 GB', 46),
(71, 'Memorie RAM', '8 GB', 46),
(72, 'Tip telefon', 'Smartphone', 51),
(73, 'Sloturi SIM', 'Dual SIM', 51),
(74, 'Tip SIM', 'Nano SIM', 51),
(75, 'Sistem de operare', 'Android', 51),
(76, 'Versiune sistem de operare', 'Android 9.0 Pie', 51),
(77, 'Numar nuclee ', '8', 51),
(78, 'Model procesor', 'Samsung Exynos 7884', 51),
(79, 'Frecventa procesor', '1.6 GHz, 1.35 GHz', 51),
(80, 'Tehnologii', '2G, 3G, 4G', 51),
(81, 'Conectivitate', 'Wi-Fi, Bluetooth, NFC, GPS', 51),
(82, 'Continut pachet', 'Telefon, Incarcator telefon', 51),
(83, 'Culoare ', 'Negru', 51),
(84, 'Dimensiune ecran', '5.8 inch', 51),
(85, 'Tip display', 'PLS, TFT', 51),
(86, 'Rezolutie (pixeli)', '720 x 1560', 51),
(87, 'Functii display', '296 PPI', 51),
(88, 'Memorie interna', '32 GB', 51),
(89, 'Memorie RAM', '3 GB', 51),
(90, 'Tip telefon', 'Smartphone', 49),
(91, 'Sloturi SIM', 'Dual SIM', 49),
(92, 'Tip SIM', 'Nano SIM', 49),
(93, 'Sistem de operare ', 'Android', 49),
(94, 'Numar nuclee', '8', 49),
(95, 'Frecventa procesor', '2 GHz', 49),
(96, 'Tehnologii', '2G, 3G, 4G', 49),
(97, 'Conectivitate', 'Wi-Fi, Bluetooth, NFC, GPS', 49),
(98, 'Continut pachet', 'Telefon, Incarcator telefon', 49),
(99, 'Culoare ', 'Alb', 49),
(100, 'Tip display', 'LCD, PLS, TFT', 49),
(101, 'Rezolutie (pixeli)', '720 x 1600', 49),
(102, 'Memorie interna', '32 GB', 49),
(103, 'Memorie RAM', '3 GB', 49),
(104, 'Slot card memorie', 'MicroSD', 49),
(105, 'Tip telefon', 'Smartphone', 53),
(106, 'Sloturi SIM', 'Dual SIM', 53),
(107, 'Tip SIM', 'Nano SIM', 53),
(108, 'Sistem de operare', 'Android', 53),
(109, 'Versiune sistem de operare', 'Android 10', 53),
(110, 'Numar nuclee', '8', 53),
(111, 'Model procesor', 'Samsung Exynos 9611', 53),
(112, 'Frecventa procesor', '2.3 GHz, 1.7 GHz', 53),
(113, 'Tehnologii', '2G, 3G, 4G', 53),
(114, 'Continut pachet', 'Telefon, Incarcator telefon, Casti', 53),
(115, 'Culoare', 'Negru', 53),
(116, 'Dimensiune ecran', '6.5 inch', 53),
(117, 'Tip display', 'Super AMOLED', 53),
(118, 'Rezolutie (pixeli)', '1080 x 2400', 53),
(119, 'Functii display', 'Corning Gorilla Glass 3', 53),
(120, 'Memorie interna', '128 GB', 53),
(121, 'Memorie RAM', '4 GB', 53),
(122, 'Slot card memorie', 'MicroSD', 53),
(141, 'Tip telefon', 'Smartphone', 68),
(142, 'Sloturi SIM', 'Hybrid SIM', 68),
(143, 'Tip SIM', 'Nano SIM', 68),
(144, 'Sistem de operare', 'Android', 68),
(145, 'Numar nuclee', '8', 68),
(146, 'Model procesor', 'Qualcomm SM7125 Snapdragon 720G', 68),
(147, 'Frecventa procesor', '2.3 GHz, 1.8 GHz', 68),
(148, 'Tehnologii', '2G, 3G, 4G', 68),
(149, 'Conectivitate', 'Wi-Fi, Bluetooth, NFC, GPS', 68),
(150, 'Culoare', 'Negru', 68),
(151, 'Dimensiune ecran', '6.5 inch', 68),
(152, 'Tip display', 'Super AMOLED', 68),
(153, 'Rezolutie (pixeli)', '2400 x 1080', 68),
(154, 'Functii display', 'FHD+', 68),
(155, 'Memorie interna', '128 GB', 68),
(156, 'Memorie RAM', '6 GB', 68),
(157, 'Slot card memorie', 'MicroSD', 68),
(158, 'Tip telefon', 'Smartphone', 52),
(159, 'Sloturi SIM', 'Dual SIM', 52),
(160, 'Tip SIM', 'Nano SIM', 52),
(161, 'Sistem de operare', 'Android', 52),
(162, 'Versiune sistem operare', 'Android 10', 52),
(163, 'Numar nuclee', '8', 52),
(164, 'Frecventa procesor', '2.2 GHz, 1.8 Ghz', 52),
(165, 'Tehnologii', '2G, 3G, 4G', 52),
(166, 'Conectivitate', 'Wi-Fi, Bluetooth, NFC, GPS', 52),
(167, 'Continut pachet', 'Telefon, Incarcator telefon', 52),
(168, 'Culoare', 'Albastru', 52),
(169, 'Dimensiune ecran', '6.7 inch', 52),
(170, 'Tip display', 'Super AMOLED', 52),
(171, 'Rezolutie (pixeli)', '1080 x 2400', 52),
(172, 'Memorie interna', '128 GB', 52),
(173, 'Memorie RAM', '6 GB', 52),
(174, 'Slot card memorie', 'MicroSD', 52),
(175, 'Tip telefon', 'Smartphone', 47),
(176, 'Sloturi SIM', 'Dual SIM', 47),
(177, 'Tip SIM', 'Nano SIM', 47),
(178, 'Sistem de operare', 'Android', 47),
(179, 'Versiune sistem operare', 'Android 10', 47),
(180, 'Numar nuclee ', '8', 47),
(181, 'Model procesor', 'Qualcomm Snapdragon 865', 47),
(182, 'Frecventa procesor', '2.84 GHz, 2.42 GHz, 1.8 GHz', 47),
(183, 'Tehnologii', '3G, 4G, 5G', 47),
(184, 'Conectivitate', 'Wi-Fi, Bluetooth, NFC, GPS', 47),
(185, 'Continut pachet', 'Telefon, Incarcator telefon', 47),
(186, 'Culoare', 'Portocaliu', 47),
(187, 'Dimensiune ecran', '6.5 inch', 47),
(188, 'Tip display', 'Super AMOLED', 47),
(189, 'Rezolutie (pixeli)', '1080 x 2400', 47),
(190, 'Functii display', 'Corning Gorilla Glass 3, 405 PPI', 47),
(191, 'Memorie interna ', '128 GB', 47),
(192, 'Memorie RAM', '6 GB', 47),
(193, 'Slot card memorie', 'MicroSDXC', 47),
(194, 'Tip telefon', 'Smartphone', 65),
(195, 'Sloturi SIM', 'Dual SIM', 65),
(196, 'Tip SIM', 'Nano SIM', 65),
(197, 'Sistem de operare', 'Android', 65),
(198, 'Versiune sistem operare', 'Android 10', 65),
(199, 'Numar nuclee', '8', 65),
(200, 'Model procesor', 'Huawei Kirin 990', 65),
(201, 'Frecventa procesor', '2.86 GHz, 2.36 GHz, 1.95 GHz', 65),
(202, 'Tehnologii', '2G, 3G, 4G, 5G', 65),
(203, 'Continut pachet', 'Husa, Telefon, Incarcator telefon, Casti', 65),
(204, 'Culoare', 'Albastru', 65),
(205, 'Dimensiune ecran', '8 inch', 65),
(206, 'Tip display', 'OLED', 65),
(207, 'Rezolutie (pixeli)', '2480 x 2200', 65),
(208, 'Functii display', 'Multi-touch', 65),
(209, 'Memorie interna', '512 GB', 65),
(210, 'Memorie RAM', '8 GB', 65),
(211, 'Slot card memorie', 'NM', 65),
(212, 'Tip telefon', 'Smartphone', 62),
(213, 'Sloturi SIM', 'Dual SIM', 62),
(214, 'Tip SIM', 'Nano SIM', 62),
(215, 'Sistem de operare', 'Android', 62),
(216, 'Versiune sistem android', 'Android 9.0 Pie', 62),
(217, 'Numar nuclee', '8', 62),
(218, 'Model procesor', 'HiSilicon Kirin 980', 62),
(219, 'Frecventa procesor', '2.6 GHz, 1.9 GHz, 1.8 GHz', 62),
(220, 'Tehnologii', 'GPRS, 2G, 3G, 4G', 62),
(221, 'Conectivitate', 'Wi-Fi, Bluetooth, NFC, GPS', 62),
(222, 'Continut pachet', 'Telefon, Incarcator telefon', 62),
(223, 'Culoare', 'Negru', 62),
(224, 'Dimensiune ecran', '6.26 inch', 62),
(225, 'Tip display ', 'IPS', 62),
(226, 'Rezolutie (pixeli)', '1080 x 2340', 62),
(227, 'Memorie interna', '128 GB', 62),
(228, 'Memorie RAM', '6 GB', 62),
(229, ' Tip telefon', 'Smartphone', 57),
(230, 'Sloturi SIM', 'Dual SIM', 57),
(231, 'Tip SIM', 'Nano SIM', 57),
(232, 'Sistem de operare', 'Android', 57),
(233, 'Versiune sistem operare', 'Android 10', 57),
(234, 'Numar nuclee', '8', 57),
(235, 'Frecventa procesor', '2 GHz, 1.7 GHz', 57),
(236, 'Tehnologii', '2G, 3G, 4G', 57),
(237, 'Conectivitate', 'Wi-Fi, Bluetooth, GPS', 57),
(238, 'Continut pachet', 'Telefon, Incarcator telefon', 57),
(239, 'Culoare', 'Verde', 57),
(240, 'Dimensiune ecran', '6.67 inch', 57),
(241, 'Tip display', 'IPS', 57),
(242, 'Rezolutie (pixeli)', '2400 x 1080', 57),
(243, 'Functii display', '16.7 milioane culori, 394 PPI', 57),
(244, ' Memorie interna', '128 GB', 57),
(245, 'Memorie RAM', '4 GB', 57),
(246, 'Slot card memorie', 'MicroSD', 57),
(247, 'Tip telefon', 'Smartphone', 58),
(248, 'Sloturi SIM', 'Dual SIM', 58),
(249, 'Tip SIM', 'Nano SIM', 58),
(250, 'Sistem de operare', 'Android', 58),
(251, 'Versiune sistem operare', 'Android 10', 58),
(252, 'Numar nuclee', '8', 58),
(253, 'Model procesor', 'HiSilicon Kirin 710A', 58),
(254, 'Frecventa procesor', '2 GHz, 1.7 GHz', 58),
(255, 'Tehnologii', '2G, 3G, 4G', 58),
(256, 'Conectivitate', 'Wi-Fi, Bluetooth, GPS', 58),
(257, 'Continut pachet', 'Telefon, Incarcator telefon', 58),
(258, 'Culoare', 'Negru', 58),
(259, 'Dimensiune ecran', '6.67 inch', 58),
(260, 'Tip display', 'IPS', 58),
(261, 'Rezolutie (pixeli)', '2400 x 1080', 58),
(262, 'Functii display', '16.7 milioane culori, 394 PPI', 58),
(263, 'Memorie interna', '128 GB', 58),
(264, 'Memorie RAM', '4 GB', 58),
(265, 'Slot card memorie', 'MicroSD', 58),
(266, 'Tip telefon', 'Smartphone', 61),
(267, 'Sloturi SIM', 'Dual SIM', 61),
(268, 'Tip SIM', 'Nano SIM', 61),
(269, 'Sistem de operare', 'Android', 61),
(270, 'Versiune sistem operare', 'Android 9', 61),
(271, 'Numar nuclee', '8', 61),
(272, 'Model procesor', 'HiSilicon Kirin 710', 61),
(273, 'Frecventa procesor', '2.2 GHz, 1.7 GHz', 61),
(274, 'Tehnologii', 'GPRS, 2G, 3G, 4G', 61),
(275, 'Conectivitate', 'Wi-Fi, Bluetooth, NFC, GPS', 61),
(276, 'Continut pachet', 'Telefon, Incarcator telefon, Casti', 61),
(277, 'Culoare', 'Albastru', 61),
(278, 'Dimensiune ecran', '6.15 inch', 61),
(279, 'Tip display', 'IPS', 61),
(280, 'Rezolutie (pixeli)', '1080 x 2312', 61),
(281, 'Functii display', 'Multi-touch, 415 PPI', 61),
(282, 'Memorie interna', '128 GB', 61),
(283, 'Memorie RAM', '4 GB', 61),
(284, 'Slot card memorie', 'MicroSD', 61),
(285, 'Tip telefon', 'Smartphone', 64),
(286, 'Sloturi SIM', 'Dual SIM', 64),
(287, 'Tip SIM', 'Nano SIM', 64),
(288, 'Sistem de operare', 'Android', 64),
(289, 'Versiune sistem operare', 'Android 9', 64),
(290, 'Numar nuclee', '8', 64),
(291, 'Model procesor', 'HiSilicon Kirin 980', 64),
(292, 'Frecventa procesor', '2.6 GHz, 1.92 GHz, 1.8 GHz', 64),
(293, 'Tehnologii', 'GPRS, 2G, 3G, 4G', 64),
(294, 'Conectivitate', 'Wi-Fi, Bluetooth, NFC, GPS, Incarcare wireless', 64),
(295, 'Continut pachet', 'Telefon, Incarcator telefon, Casti', 64),
(296, 'Culoare', 'Albastru', 64),
(297, 'Dimensiune ecran', '6.47 inch', 64),
(298, 'Tip display', 'OLED', 64),
(299, 'Rezolutie (pixeli)', '1080 x 2340', 64),
(300, 'Memorie interna', '128 GB', 64),
(301, 'Memorie RAM', '6 GB', 64),
(302, 'Slot card memorie', 'NanoSD', 64),
(303, 'Tip telefon', 'Smartphone', 48),
(304, 'Sloturi SIM', 'Dual SIM', 48),
(305, 'Tip SIM', 'Nano SIM', 48),
(306, 'Sistem de operare', 'Android', 48),
(307, 'Versiune sistem operare', 'Android 9', 48),
(308, 'Numar nuclee', '8', 48),
(309, 'Model procesor', 'HiSilicon Kirin 710F', 48),
(310, 'Frecventa procesor', '2.2 GHz, 1.7 GHz', 48),
(311, 'Tehnologii', 'GPRS, 2G, 3G, 4G', 48),
(312, 'Conectivitate', 'Wi-Fi, Bluetooth, GPS', 48),
(313, 'Continut pachet', 'Telefon, Incarcator telefon', 48),
(314, 'Culoare', 'Albastru', 48),
(315, ' Dimensiune ecran', '6.39 inch', 48),
(316, 'Tip display', 'IPS', 48),
(317, 'Rezolutie (pixeli)', '720 x 1560', 48),
(318, 'Functii display', 'Multi-touch', 48),
(319, 'Memorie interna', '64 GB', 48),
(320, 'Memorie RAM', '4 GB', 48),
(321, 'Slot card memorie', 'MicroSD', 48),
(322, 'Tip telefon', 'Smartphone', 59),
(323, 'Sloturi SIM', 'Dual SIM', 59),
(324, 'Tip SIM', 'Nano SIM', 59),
(325, 'Numar nuclee', '8', 59),
(326, 'Model procesor', 'Kirin 810', 59),
(327, 'Frecventa procesor', '2.27 GHz, 1.88 GHz', 59),
(328, 'Tehnologii', '2G, 3G, 4G', 59),
(329, 'Conectivitate', 'Wi-Fi, Bluetooth, NFC, GPS', 59),
(330, 'Continut pachet', 'Telefon, Incarcator telefon, Casti', 59),
(331, 'Culoare', 'Roz', 59),
(332, 'Dimensiune ecran', '6.4 inch', 59),
(333, 'Tip display', 'LCD', 59),
(334, 'Rezolutie (pixeli)', '2310 x 1080', 59),
(335, 'Functii display', '398 PPI, 16.7 milioane culori', 59),
(336, 'Memorie interna', '128 GB', 59),
(337, 'Memorie RAM', '6 GB', 59),
(338, 'Slot card memorie', 'NM', 59),
(339, 'Tip telefon', 'Smartphone', 60),
(340, 'Sloturi SIM', 'Dual SIM', 60),
(341, 'Tip SIM', 'Nano SIM', 60),
(342, 'Sistem de operare', 'Android', 60),
(343, 'Versiune sistem operare', 'Android 10', 60),
(344, 'Numar nuclee', '8', 60),
(345, 'Model procesor', 'Huawei Kirin 990', 60),
(346, 'Frecventa procesor', '2.86 GHz, 2.36 GHz, 1.95 GHz', 60),
(347, 'Tehnologii', 'GPRS, 2G, 3G, 4G, 5G', 60),
(348, 'Conectivitate', 'Wi-Fi, Bluetooth, NFC, GPS, Incarcare wireless', 60),
(349, 'Continut pachet', 'Telefon, Incarcator telefon, Casti', 60),
(350, 'Culoare', 'Argintiu', 60),
(351, 'Dimensiune ecran', '6.58 inch', 60),
(352, 'Tip display', 'OLED', 60),
(353, 'Rezolutie (pixeli)', '2640 x 1200', 60),
(354, 'Memorie interna', '256 GB', 60),
(355, 'Memorie RAM', '8 GB', 60),
(356, ' Producator procesor', 'Intel&reg;', 69),
(357, 'Tip procesor', 'i3', 69),
(358, 'Model procesor', '1005G1', 69),
(359, 'Arhitectura', 'Ice Lake', 69),
(360, 'Numar nuclee', '2', 69),
(361, 'Frecventa nominala', '1.2 GHz', 69),
(362, 'Diagonala display', '17.3 inch', 69),
(363, 'Rezolutie', '1920 x 1080', 69),
(364, 'Touchscreen', 'Nu', 69),
(365, 'Capacitate memorie', '8 GB', 69),
(366, 'Tip memorie', 'DDR4', 69),
(367, 'Sloturi ocupate', '1', 69),
(368, 'Frecventa', '2666 MHz', 69),
(369, 'Tip stocare', 'SSD', 69),
(370, 'Capacitate SSD', '256 GB', 69),
(371, 'Interfata SSD', 'PCI Express', 69),
(372, 'Tip placa video', 'Integrata', 69),
(373, 'Chipset video', 'Intel UHD', 69),
(374, 'Camera WEB', 'HD', 69),
(375, 'Porturi', '2 x USB 3.1, 1 x USB 2.0, 1 x HDMI, 1 x RJ-45', 69),
(376, 'Sistem de operare', 'Ubuntu', 69),
(377, 'Producator procesor', 'Intel&reg;', 70),
(378, 'Tip procesor', 'i5', 70),
(379, 'Model procesor', '1135G7', 70),
(380, 'Arhitectura', 'Tiger Lake', 70),
(381, 'Numar nuclee', '4', 70),
(382, 'Frecventa nominala', '2.4 GHz', 70),
(383, 'Cache', '8192 KB', 70),
(384, 'Frecventa Turbo Boost', '4.2 GHz', 70),
(385, 'Tehnologie procesor', '10 nm', 70),
(386, 'Procesor grafic integrat', 'Intel&reg; Iris&trade; Xe Graphics', 70),
(387, 'Diagonala display', '14 inch', 70),
(388, 'Format display', 'Full HD', 70),
(389, 'Tehnologie display', 'LCD LED', 70),
(390, 'Rezolutie', '1920 x 1080', 70),
(391, 'Touchscreen', 'Da', 70),
(392, 'Capacitate memorie', '8 GB', 70),
(393, 'Tip memorie', 'DDR4', 70),
(394, 'Sloturi ocupate', '1', 70),
(395, 'Frecventa', '3200 MHz', 70),
(396, 'Tip stocare', 'SSD', 70),
(397, 'Capacitate SSD', '256 GB', 70),
(398, 'Interfata SSD', 'PCI Express', 70),
(399, 'Tip placa video', 'Integrata', 70),
(400, 'Sistem de operare', 'Windows 10 Home', 70),
(401, 'Producator procesor', 'Intel&reg;', 71),
(402, 'Tip procesor', 'i5', 71),
(403, 'Model procesor', '1135G7', 71),
(404, 'Arhitectura', 'Tiger Lake', 71),
(405, 'Numar nuclee', '4', 71),
(406, 'Frecventa nominala', '2.4 GHz', 71),
(407, 'Diagonala display', '15.6 inch', 71),
(408, 'Format display', 'Full HD', 71),
(409, 'Rezolutie', '1920 x 1080', 71),
(410, 'Capacitate memorie', '4 GB', 71),
(411, 'Tip memorie', 'DDR4', 71),
(412, 'Frecventa', '2666 MHz', 71),
(413, 'Tip stocare', 'HDD', 71),
(414, 'Capacitate HDD/SSHD', '1 TB', 71),
(415, 'Tip placa video', 'Integrata', 71),
(416, 'Chipset video', 'Intel Iris Xe', 71),
(417, 'Unitate optica', 'Nu', 71),
(418, 'Sistem de operare', 'Windows 10 Pro', 71),
(440, ' Producator procesor', 'Intel&reg;', 74),
(441, 'Tip procesor', 'Celeron', 74),
(442, 'Model procesor', '5205U', 74),
(443, 'Arhitectura', 'Comet Lake', 74),
(444, 'Numar nuclee', '2', 74),
(445, 'Frecventa nominala', '1.9 GHz', 74),
(446, 'Procesor grafic integrat', 'Intel&reg; UHD Graphics', 74),
(447, 'Diagonala display', '14 inch', 74),
(448, 'Format display', 'Full HD', 74),
(449, 'Tehnologie display', 'LCD LED', 74),
(450, 'Rezolutie', '1920 x 1080', 74),
(451, 'Capacitate memorie', '4 GB', 74),
(452, 'Tip memorie', 'DDR4', 74),
(453, 'Tip stocare', 'SSD', 74),
(454, 'Capacitate SSD', '128 GB', 74),
(455, 'Interfata SSD', 'PCI Express', 74),
(456, 'Tip placa video', 'Integrata', 74),
(457, 'Camera WEB', 'HD', 74),
(458, 'Sistem de operare', 'Ubuntu', 74),
(459, 'Producator procesor', 'Intel&reg;', 75),
(460, 'Tip procesor', 'i9', 75),
(461, 'Model procesor', '10980HK', 75),
(462, 'Arhitectura', 'Comet Lake', 75),
(463, 'Numar nuclee', '8', 75),
(464, 'Frecventa nominala', '2.4 GHz', 75),
(465, 'Cache', '16384 KB', 75),
(466, 'Frecventa Turbo Boost', '5.3 GHz', 75),
(467, 'Tehnologie procesor', '14 nm', 75),
(468, 'Procesor grafic integrat', 'Intel&reg; UHD Graphics', 75),
(469, 'Diagonala display', '15.6 inch', 75),
(470, 'Rata de refresh', '144 Hz', 75),
(471, 'Finisaj display', 'Anti-Glare', 75),
(472, 'Rezolutie', '1920 x 1080', 75),
(473, 'Capacitate memorie', '32 GB', 75),
(474, 'Tip memorie', 'DDR4', 75),
(475, 'Frecventa', '2666 MHz', 75),
(476, ' Tip stocare', 'SSD', 75),
(477, 'Capacitate SSD', '4 TB 512 GB', 75),
(478, 'Interfata SSD', 'M.2', 75),
(479, 'Tip placa video', 'Dedicata', 75),
(480, 'Chipset video', 'nVidia GeForce RTX', 75),
(481, 'Model placa video', 'RTX 2080 Super', 75),
(482, 'Capacitate memorie video', '8192 MB', 75),
(483, 'Tehnologii placa video', 'Suport DirectX 12', 75),
(484, 'Tip memorie placa video', 'GDDR6', 75),
(485, 'Sistem de operare', 'Windows 10 Pro', 75),
(486, 'Producator procesor', 'Intel&reg;', 76),
(487, 'Tip procesor', 'i7', 76),
(488, 'Model procesor', '10875H', 76),
(489, 'Arhitectura', 'Comet Lake', 76),
(490, 'Numar nuclee', '8', 76),
(491, 'Frecventa nominala', '2.3 GHz', 76),
(492, 'Frecventa Turbo Boost', '5.1 GHz', 76),
(493, 'Diagonala display', '17 inch', 76),
(494, 'Format display', 'UHD+', 76),
(495, 'Rezolutie', '3840 x 2400', 76),
(496, 'Touchscreen', 'Da', 76),
(497, 'Capacitate memorie', '32 GB', 76),
(498, 'Tip memorie', 'DDR4', 76),
(499, 'Numar sloturi', '2', 76),
(500, 'Frecventa', '2933 MHz', 76),
(501, 'Tip stocare', 'SSD', 76),
(502, 'Capacitate SSD', '1 TB', 76),
(503, 'Tip placa video', 'Dedicata', 76),
(504, 'Chipset video', 'nVidia GeForce RTX', 76),
(505, 'Model placa video', 'RTX 2060 Max-Q', 76),
(506, 'Capacitate memorie video', '6144 MB', 76),
(507, 'Tehnologii placa video', 'DirectX 12 GeForce Experience', 76),
(508, 'Tip memorie placa video', 'GDDR6', 76),
(509, 'Sistem de operare', 'Windows 10 Pro', 76),
(510, 'Producator procesor', 'Intel&reg;', 77),
(511, 'Tip procesor', 'i3', 77),
(512, 'Model procesor', '10110U', 77),
(513, 'Arhitectura', 'Comet Lake', 77),
(514, 'Numar nuclee', '2', 77),
(515, 'Frecventa nominala', '2.1 GHz', 77),
(516, 'Frecventa Turbo Boost', '4.1 GHz', 77),
(517, 'Diagonala display', '15.6 inch', 77),
(518, 'Format display', 'Full HD', 77),
(519, 'Tehnologie display', 'LED', 77),
(520, 'Rezolutie', '1920 x 1080', 77),
(521, 'Capacitate memorie', '4 GB', 77),
(522, 'Tip memorie', 'DDR4', 77),
(523, 'Tip stocare', 'SSD', 77),
(524, 'Capacitate SSD', '128 GB', 77),
(525, 'Tip placa video', 'Integrata', 77),
(526, 'Chipset video', 'Intel UHD', 77),
(527, 'Tip memorie placa video', 'GDDR5', 77),
(528, 'Sistem de operare', 'Linux', 77);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_active_account` tinyint(4) NOT NULL DEFAULT 0,
  `user_registered_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_first_name` varchar(100) NOT NULL,
  `user_last_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_email`, `user_password`, `user_active_account`, `user_registered_at`, `user_first_name`, `user_last_name`) VALUES
(9, 'vladlucaciu0@yahoo.com', '$2y$10$GYf0AyojXZp9U7J.E/Lk7ekUHm7.sW8FFb4mOGs86AYhTbhGr5ZbG', 1, '2021-06-11 23:02:52', 'Lucaciu', 'Vlad'),
(20, 'lucaciu_vlad@yahoo.com', '$2y$10$d6suduvp3F5WOvxzdOjrzOqIKWtlsZfootiEiJJ0hOdKJh3KtNIOe', 1, '2021-06-26 21:34:56', 'Lucaciu', 'Vlad');

-- --------------------------------------------------------

--
-- Table structure for table `user_addresses`
--

CREATE TABLE `user_addresses` (
  `id` int(11) NOT NULL,
  `user_full_address` text NOT NULL,
  `user_phone_number` varchar(20) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_addresses`
--

INSERT INTO `user_addresses` (`id`, `user_full_address`, `user_phone_number`, `user_id`) VALUES
(11, 'Strada Ciocarliei, Nr.4, Ap. 18, Cluj-Napoca, Cluj', '0748978468', 9);

-- --------------------------------------------------------

--
-- Table structure for table `wishlists`
--

CREATE TABLE `wishlists` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `wishlists`
--

INSERT INTO `wishlists` (`id`, `user_id`, `created_at`) VALUES
(207, 9, '2021-06-26 21:12:13'),
(208, 20, '2021-06-26 21:36:19');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist_details`
--

CREATE TABLE `wishlist_details` (
  `wishlist_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unq_admins` (`admin_email`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_carts_users` (`user_id`);

--
-- Indexes for table `cart_details`
--
ALTER TABLE `cart_details`
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orders_users` (`user_id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD KEY `fk_order_details_orders` (`order_id`),
  ADD KEY `fk_order_details_products` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unq_products` (`product_name`) USING HASH,
  ADD KEY `fk_products_brands` (`brand_id`),
  ADD KEY `fk_products_categories` (`category_id`);

--
-- Indexes for table `product_descriptions`
--
ALTER TABLE `product_descriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_product_descriptions` (`product_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_product_images_products` (`product_id`);

--
-- Indexes for table `product_specifications`
--
ALTER TABLE `product_specifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_product_specifications` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unq_users` (`user_email`);

--
-- Indexes for table `user_addresses`
--
ALTER TABLE `user_addresses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unq_user_addresses` (`user_full_address`,`user_phone_number`) USING HASH,
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_wishlists_users` (`user_id`);

--
-- Indexes for table `wishlist_details`
--
ALTER TABLE `wishlist_details`
  ADD KEY `fk_wishlist_details_products` (`product_id`),
  ADD KEY `fk_wishlist_details_wishlists` (`wishlist_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=448;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=443;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `product_descriptions`
--
ALTER TABLE `product_descriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=391;

--
-- AUTO_INCREMENT for table `product_specifications`
--
ALTER TABLE `product_specifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=529;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `user_addresses`
--
ALTER TABLE `user_addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `wishlists`
--
ALTER TABLE `wishlists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=209;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `fk_carts_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `cart_details`
--
ALTER TABLE `cart_details`
  ADD CONSTRAINT `cart_details_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `fk_order_details_orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_order_details_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_brands` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_products_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_descriptions`
--
ALTER TABLE `product_descriptions`
  ADD CONSTRAINT `fk_product_descriptions` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `fk_product_images_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_specifications`
--
ALTER TABLE `product_specifications`
  ADD CONSTRAINT `fk_product_specifications` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_addresses`
--
ALTER TABLE `user_addresses`
  ADD CONSTRAINT `fk_user_addresses_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD CONSTRAINT `fk_wishlists_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `wishlist_details`
--
ALTER TABLE `wishlist_details`
  ADD CONSTRAINT `fk_wishlist_details_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_wishlist_details_wishlists` FOREIGN KEY (`wishlist_id`) REFERENCES `wishlists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
