<section class="userPanel">
    <?php
    if (!isset($_SESSION["userID"])) :
    ?>
    <div class="userPanel__noUser">
        <i class="fa fa-user" aria-hidden="true"></i>
        <h3> Salut, momentan nu esti logat. </h3>
        <p> Intra in contul tau sau inregistreaza-te pentru a avea un mai mare control asupra produselor tale.
        </p>
        <div class="userPanel__noUser__actions">
            <a href="login.php">
                <i class="fa fa-sign-in" aria-hidden="true"></i>
                <span> Logare </span>
            </a>
            <a href="register.php">
                <i class="fa fa-user-plus" aria-hidden="true"></i>
                <span> Inregistrare </span>
            </a>
        </div>
    </div>
    <?php else : ?>

    <div class="userPanel__user">
        <div class="userPanel__user__header">
            <i class="fa fa-user" aria-hidden="true"></i>
            <h3> Salut, <?php echo $_SESSION["userFullName"]; ?>! </h3>
        </div>

        <div class="userPanel__user__actions">
            <a href="myAccount.php" class="myAcc">
                <i class="fa fa-user-o" aria-hidden="true"></i>
                <span> Contul meu </span>
            </a>
            <a href="accountInfo.php" class="accInfo">
                <i class="fa fa-info-circle" aria-hidden="true"></i>
                <span> Gestionare cont </span>
            </a>
            <a href="myOrders.php" class="myOrders">
                <i class="fa fa-credit-card" aria-hidden="true"></i>
                <span> Comenzile mele </span>
            </a>
            <a href="favoriteProducts.php" class="favoriteProducts">
                <i class="fa fa-heart-o" aria-hidden="true"></i>
                <span> Produse favorite </span>
            </a>
            <button type="button" class="logout">
                <i class="fa fa-sign-out" aria-hidden="true"></i>
                <span> Delogare </span>
            </button>
        </div>
    </div>
    <?php endif; ?>
</section>