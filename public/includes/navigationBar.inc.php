<nav class="navbar">
    <div class="navbar__left">
        <div class="navbar__left__menu">
            <button type="button" class="hamburger">
                <i class="fa fa-bars" aria-hidden="true"></i>
            </button>

            <div class="navbar__left__menu__categories">
                <ul>
                    <li class="login">
                        <a href="<?php if (!isset($_SESSION["userFullName"])) {
                                        echo "login.php";
                                    } else {
                                        echo "myAccount.php";
                                    } ?>
                                ">
                            <i class=" fa fa-user-o" aria-hidden="true"></i>
                            <span>
                                <?php
                                if (isset($_SESSION["userFullName"])) {
                                    echo $_SESSION["userFullName"];
                                } else {
                                    echo "Contul meu";
                                }
                                ?>
                            </span>
                        </a>
                    </li>

                    <?php
                    require("./classes/homepage.class.php");

                    $homepageHandler = new Homepage();
                    $categories = $homepageHandler->fetchCategories();

                    foreach ($categories as $category) :
                    ?>

                    <li>
                        <a href="category.php?categoryID=<?php echo $category["id"]; ?>">
                            <i class="fa <?php echo $category["category_icon"]; ?>" aria-hidden="true"></i>
                            <span> <?php echo $category["category_name"]; ?> </span>
                        </a>
                    </li>

                    <?php endforeach; ?>

                </ul>
            </div>
        </div>

        <div class="navbar__left__home">
            <a href="index.php">
                <img src="./assets/imgs/itmag-logo.png" alt="ITMAG Logo" />
            </a>
        </div>
    </div>

    <div class="navbar__search">
        <div class="navbar__search__input">
            <input type="text" placeholder="Cauta produsul preferat" name="searchToken" />
            <i class="fa fa-times" aria-hidden="true"></i>
            <i class="fa fa-search" aria-hidden="true"></i>
        </div>

        <div class="navbar__search__suggestions">
            <span> Rezultate de cautare </span>

            <ul>
            </ul>

            <div class="navbar__search__suggestions__back">
                <i class="fa fa-arrow-left" aria-hidden="true"></i>
                <span> Inapoi la ITMAG </span>
            </div>
        </div>
    </div>

    <div class="navbar__right">
        <button type="button">
            <i class="fa fa-search" aria-hidden="true"></i>
        </button>

        <div class="navbar__right__user">
            <a href="<?php if (!isset($_SESSION["userFullName"])) {
                            echo "login.php";
                        } else {
                            echo "myAccount.php";
                        } ?>
                    ">
                <i class="fa fa-user-o" aria-hidden="true"></i>
                <span>
                    <?php
                    if (isset($_SESSION["userFullName"])) {
                        echo $_SESSION["userFullName"];
                    } else {
                        echo "Contul meu";
                    }
                    ?>
                </span>
            </a>

            <div class="navbar__right__user__panel">
                <ul>
                    <?php
                    if (!isset($_SESSION["userFullName"])) :
                    ?>

                    <li>
                        <a href="register.php">
                            <i class="fa fa-user-plus" aria-hidden="true"></i>
                            <span> Inregistrare </span>
                        </a>
                    </li>
                    <li>
                        <a href="login.php">
                            <i class="fa fa-sign-in" aria-hidden="true"></i>
                            <span> Logare </span>
                        </a>
                    </li>

                    <?php else : ?>
                    <li>
                        <a href="myAccount.php">
                            <i class="fa fa-user-o" aria-hidden="true"></i>
                            <span> Contul meu </span>
                        </a>
                    </li>
                    <li>
                        <a href="favoriteProducts.php">
                            <i class="fa fa-heart-o" aria-hidden="true"></i>
                            <span> Produse favorite </span>
                        </a>
                    </li>
                    <li>
                        <button type="button" class="logout">
                            <i class="fa fa-sign-out" aria-hidden="true"></i>
                            <span> Delogare </span>
                        </button>
                    </li>

                    <?php endif; ?>
                </ul>
            </div>
        </div>

        <div class="navbar__right__favoriteProducts">
            <a href="favoriteProducts.php">
                <i class="fa fa-heart-o" aria-hidden="true"></i>
                <span> Favorite </span>
                <div class="counter">
                    <span> </span>
                </div>
            </a>

            <div class="navbar__right__favoriteProducts__panel">
                <span> Ultimele adaugate </span>

                <ul>
                </ul>

                <button type="button" class="goToFav">
                    <a href="fav.php"> Vezi toate produsele favorite </a>
                </button>
            </div>
        </div>

        <div class="navbar__right__shoppingCart">
            <a href="cart.php">
                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                <span> Cosul meu </span>
                <div class="counter">
                    <span> </span>
                </div>
            </a>

            <div class="navbar__right__shoppingCart__panel">
                <span> Ultimele adaugate </span>

                <ul>
                </ul>

                <div class="summary">
                    <p class="totalLabel"> TOTAL: <span class="totalCounter"> </span> </p>
                    <p class="newPrice">
                        <span class="whole"> </span>
                        <sup class="decimal"> </sup>
                        <span> Lei </span>
                    </p>
                </div>

                <button type="button" class="goToCart">
                    <a href="cart.php"> Vezi detalii cos </a>
                </button>
            </div>
        </div>
    </div>
</nav>