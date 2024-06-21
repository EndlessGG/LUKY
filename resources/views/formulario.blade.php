
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario</title>
    <link rel="stylesheet" href="{{ asset('resources/css/style.css') }}">
</head>
<body>
        
    <div class="container">
        <div class="container-form">
            <form class="sign-in">
                <h2>Iniciar Sesión</h2>
                <div class="social-networks">
                    <ion-icon name="logo-google"></ion-icon>
                    <ion-icon name="logo-facebook"></ion-icon>
                    <ion-icon name="logo-twitter"></ion-icon>
                </div>
                <span>Ingrese su correo y contraseña</span>
                <div class="container-input">
                    <ion-icon name="mail-outline"></ion-icon>
                    <input type="text" placeholder="Correo">
                </div>
                <div class="container-input">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input type="password" placeholder="Contraseña">
                </div>
                <a href="#">¿Olvidaste tu contraseña?</a>
                <button class="button">INICIAR SESIÓN</button>
            </form>
        </div>

        <div class="container-form">
            <form class="sign-up">
                <h2>Registrarse</h2>
                <div class="social-networks">
                    <ion-icon name="logo-google"></ion-icon>
                    <ion-icon name="logo-facebook"></ion-icon>
                    <ion-icon name="logo-twitter"></ion-icon>
                </div>
                <span>Ingrese su correo electrónico para registrarse</span>
                <div class="container-input">
                    <ion-icon name="person-outline"></ion-icon>
                    <input type="text" placeholder="Nombre">
                </div>
                <div class="container-input inline">
                    <div>
                        
                        <input type="text" placeholder="Apellido Paterno">
                    </div>
                    <div>
                        
                        <input type="text" placeholder="Apellido Materno">
                    </div>
                </div>
                <div class="container-input">
                    <ion-icon name="mail-outline"></ion-icon>
                    <input type="text" placeholder="Correo">
                </div>
                <div class="container-input">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input type="password" placeholder="Contraseña">
                </div>
                
                <div class="container-input select-container">
                    <ion-icon name="star-outline"></ion-icon>
                    <select name="tipo" id="tipo">
                        <option value="usuario">Usuario</option>
                        <option value="servicios">Servicios</option>
                    </select>
                </div>
                <a href="#">Terminos y condiciones</a>
                <button class="button" >REGISTRARSE</button>
            </form>
        </div>

        <div class="container-welcome">
            <div class="welcome-sign-up welcome">
                <h3>¡Bienvenido a LUKY</h3>
                <p>Y disfrute de los servicios que se ofrecen</p>
                <button class="button" id="btn-sign-up">Registrarse</button>
            </div>
            <div class="welcome-sign-in welcome">
                <h3>¡Hola!</h3>
                <p>Miles de clientes satisfechos, ¿Serás el Próximo?</p>
                <button class="button" id="btn-sign-in">Iniciar Sesión</button>
            </div>
        </div>

    </div>


    <script src="{{ asset('resources/js/script.js') }}"></script>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</body>
</html>
