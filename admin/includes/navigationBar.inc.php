<nav class="navigationBar">
    <i class="fa fa-bars hamburger" aria-hidden="true"></i>

    <div class="navigationBar__store">
        <a href="../public" target="_BLANK">
            <p> ITmag </p>
            <i class="fa fa-external-link" aria-hidden="true"></i>
        </a>

        <div class="tooltip">
            <i class="fa fa-caret-left"></i>
            <p> Vezi site </p>
        </div>
    </div>

    <div class="navigationBar__search">
        <div class="navigationBar__search__field">
            <i class="fa fa-search" aria-hidden="true"></i>
            <input type="text" placeholder="Cauta produse, comenzi, clienti..." />
            <i class="fa fa-close" aria-hidden="true"></i>
        </div>

        <div class="navigationBar__search__suggestions">
            <div class="navigationBar__search__suggestions__header">
                <p> Sugestii de cautare </p>
                <a href="search.php">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <p> Cautare avansata </p>
                </a>
            </div>

            <div class="navigationBar__search__suggestions__results">
                <ul>
                </ul>
            </div>
        </div>
    </div>

    <div class="navigationBar__user">
        <div class="navigationBar__user__tab">
            <i class="fa fa-user" aria-hidden="true"></i>
            <p> Salut,
                <?php
                if (isset($_SESSION["adminName"]))
                    echo $_SESSION["adminName"];
                ?>
                !
            </p>
        </div>

        <div class="navigationBar__user__panel">
            <p> Salut,
                <?php
                if (isset($_SESSION["adminName"]))
                    echo $_SESSION["adminName"];
                ?>
                !
            </p>
            <a href="myAccount.php"> Informatii personale </a>
            <a href="" class="logout"> Iesire </a>
        </div>
    </div>
</nav>