<?php
require_once("./classes/db.class.php");
require_once("./classes/navbar.class.php");

$navbar = new Navbar($dbConn);
?>

<nav class="navbar">
    <div class="navbar__left-area">
        <i class="fa fa-bars" aria-hidden="true"></i>

        <ul class="navbar__left-area__categories">
            <?php
            $navbar->getProductCategories();
            ?>
        </ul>
    </div>

    <div class="navbar__logo">
        <a href="index.php">
            <img src="./assets/imgs/itmag-logo.png" alt="Logo Brand">
        </a>
    </div>

    <div class="navbar__search">
        <div class="navbar__search__container">
            <input type="text" placeholder="Cauta produsul preferat">
            <i class="fa fa-times" aria-hidden="true"></i>
            <i class="fa fa-search" aria-hidden="true"></i>
        </div>

        <div class="navbar__search__suggestions">
            <span> Cele mai cautate produse </span>

            <a href="#">
                <i class="fa fa-bar-chart" aria-hidden="true"></i>
                <span> Sugestie 1 </span>
            </a>

            <a href="#">
                <i class="fa fa-bar-chart" aria-hidden="true"></i>
                <span> Sugestie 1 </span>
            </a>

            <a href="#">
                <i class="fa fa-bar-chart" aria-hidden="true"></i>
                <span> Sugestie 1 </span>
            </a>

            <a href="#">
                <i class="fa fa-bar-chart" aria-hidden="true"></i>
                <span> Sugestie 1 </span>
            </a>

            <a href="#">
                <i class="fa fa-bar-chart" aria-hidden="true"></i>
                <span> Sugestie 1 </span>
            </a>

            <a href="#">
                <i class="fa fa-bar-chart" aria-hidden="true"></i>
                <span> Sugestie 1 </span>
            </a>

            <a href="#">
                <i class="fa fa-bar-chart" aria-hidden="true"></i>
                <span> Sugestie 1 </span>
            </a>

            <a href="#">
                <i class="fa fa-bar-chart" aria-hidden="true"></i>
                <span> Sugestie 1 </span>
            </a>

            <a href="#">
                <i class="fa fa-bar-chart" aria-hidden="true"></i>
                <span> Sugestie 1 </span>
            </a>

            <a href="#">
                <i class="fa fa-bar-chart" aria-hidden="true"></i>
                <span> Sugestie 1 </span>
            </a>

            <div class="navbar__search__suggestions__back">
                <i class="fa fa-arrow-left" aria-hidden="true"></i>
                <span> Inapoi pe ITMAG </span>
            </div>
        </div>
    </div>

    <div class="navbar__right-area">
        <i class="fa fa-search" aria-hidden="true"></i>

        <div>
            <a href="<?php if (!isset($_SESSION["client"])) : ?>login.php <?php else : ?> user.php <?php endif; ?>">
                <i class="fa <?php if (!isset($_SESSION["client"])) : ?> fa-user-o <?php else : ?>  fa-circle"
                    <?php endif; ?> aria-hidden="true">
                    <span class="user">
                        <?php
                        if (isset($_SESSION["client"]))
                            echo $_SESSION["client"];
                        ?>
                    </span>
                </i>
                <span> Contul meu </span>
                <i class="fa fa-caret-down" aria-hidden="true"></i>
            </a>

            <div class="user-panel">
                <?php
                if (!isset($_SESSION["client"])) :
                ?>

                <div class="user-panel__not-logged-in">
                    <div class="user-panel__not-logged-in__header">
                        <i class="fa fa-user" aria-hidden="true"></i>
                        <span> Intra in contul tau ITMAG pentru a fi conectat cu noile reduceri! </span>
                    </div>

                    <div class="user-panel__not-logged-in__actions">
                        <a href="login.php">
                            <i class="fa fa-chevron-right" aria-hidden="true"></i>
                            <span> Intra in cont </span>
                        </a>
                        <a href="login.php"> <span> Creeaza un cont nou </span> </a>
                    </div>
                </div>

                <?php
                else :
                ?>

                <div class="user-panel__actions active">
                    <span> <?php echo $_SESSION["client"]; ?> </span>
                    <ul>
                        <li>
                            <a href="user.php"> <span> Contul meu </span> </a>
                        </li>
                        <li>
                            <a href="favorites.php"> <span> Produse favorite </span> </a>
                        </li>
                        <li class="last">
                            <a href="logout.php"> <span> Logout </span> </a>
                        </li>
                    </ul>
                </div>
                <?php endif; ?>
            </div>
        </div>

        <div>
            <a href="#">
                <i class="fa fa-heart-o" aria-hidden="true">
                    <div class="items-count">
                        <span> 6 </span>
                    </div>
                </i>
                <span> Favorite </span>
                <i class="fa fa-caret-down" aria-hidden="true"></i>
            </a>
        </div>

        <div>
            <a href="#">
                <i class="fa fa-shopping-cart" aria-hidden="true">
                    <div class="items-count">
                        <span> 69 </span>
                    </div>
                </i>
                <span> Cosul meu </span>
                <i class="fa fa-caret-down" aria-hidden="true"></i>
            </a>
        </div>
    </div>
</nav>

<div class="overlay"></div>