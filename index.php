<!DOCTYPE html>
<html lang="en-us">

<head>
    <meta charset="utf-8">

    <title>ShaCu</title>

    <link rel="stylesheet" href="./css/main.css" type="text/css" />
    <link rel="stylesheet" href="./css/nav.css" type="text/css" />
    <link rel="stylesheet" href="./css/boxes.css" type="text/css" />
    <link rel="stylesheet" href="./css/fonts.css" type="text/css" />
    <link rel="stylesheet" href="./css/popup.css" type="text/css" />
    <link rel="stylesheet" href="./css/clock.css" type="text/css" />

    <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">

    <!--<meta name="viewport" content="width=device-width, initial-scale=1.0">-->

</head>

<body>
    <div class="noScroll">

        <!--tag1 contains home, about us, dowload and contact -->
        <div id="tag1" class="tag">
            <header>
                <a id="logoTitle">
                    <img id="logo" src="./images/logo2.png" /><br/>
                    <img id="imgTitle" src="./images/title.png"></img>
                </a>
            </header>
            <nav>
                <ul>
                    <li id="aboutLink"><a href="#">About us</a></li>
                    <li id="dowloadLink"><a href="#">Download</a></li>
                    <li id="contactLink"><a href="#">Contact</a></li>
                </ul>
            </nav>
            
            <!--subtag1 only contains the down arrow-->
            <div class="subtag" id="subtag1">
                <footer>
                    <div class="arrow arrowBottom"></div>
                </footer>
            </div>
            <!--end subtag1-->

            <!--subtag2 contains about us information-->
            <div class="subtag hidden" id="subtag2">
                <section class="informationBox aboutUsBox">
                    <article>
                        <h2>About us:</h2>
                        <p>
                            We are a group of students from the University of La Laguna. This project has been developed around two subjects: Personal computer interaction and smart interfaces. The project participants are:
                        </p>
                        <p>
                            <center>
                                <table>
                                    <tr>
                                        <td>
                                            Carlos Troyano Carmona
                                        </td>
                                        <td>
                                            <a href="https://github.com/ctc87" target="_blank"><img src="./images/github.png"></img>
                                            </a>
                                        </td>
                                        <td>
                                            <a class="mailPopUp" id="mail1" href="#"><img src="./images/mail.png"></img>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Miguel Castro Caraballo
                                        </td>
                                        <td>
                                            <a href="https://github.com/alu0100886870" target="_blank"><img src="./images/github.png"></img>
                                            </a>
                                        </td>
                                        <td>
                                            <a class="mailPopUp" id="mail2" href="#"><img src="./images/mail.png"></img>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Oscar Josué Catari Gutiérrez
                                        </td>
                                        <td>
                                            <a href="https://github.com/alu0100825893" target="_blank"><img src="./images/github.png"></img>
                                            </a>
                                        </td>
                                        <td>
                                            <a class="mailPopUp" id="mail3" href="#"><img src="./images/mail.png"></img>
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </center>
                        </p>
                    </article>
                </section>
            </div>
            <!--end subtag2-->

            <!--subtag3 contains dowload section-->
            <div class="subtag hidden" id="subtag3">
                <section class="informationBox dowloadBox">
                    <article>
                        <h2>Download:</h2>
                        <p>Download the aplication</p>
                        <a href="aplicacion/shacu.apk" download>
                            <img src="./images/dowload.png"></img>
                        </a>
                    </article>
                </section>
            </div>
            <!--end subtag3-->

            <!--subtag 4 contains contact form-->
            <div class="subtag hidden" id="subtag4" >
                <section class="informationBox contactBox" jsb_clk="clock1">
                    <article>
                        <h2>Contact:</h2><br/>
                        <form action="action_page.html" method="GET" target="_blank" accept-charset="UTF-8" onsubmit="return validate();">
                            Name <input type="text" value="name" onclick="if(this.value=='name') this.value=''" id="nom" name="nom" /> 
                            Email <input type="text" value="example@example.com" onclick="if(this.value=='example@example.com') this.value=''" id="mail"
                                name="email" />
                            <br/><br/>
                            <hr/><br/>
                            <h3>Subject</h3>
                            <textarea id="subjectTextArea" name="subject"></textarea>
                            <h3>Receive news</h3>
                            <input type="radio" name="receiveNews" value="yes" checked="checked"> yes
                            <input type="radio" name="receiveNews" value="no"> no<br/><br/>
                            <input type="submit" value="send" id="sendButton">
                        </form>
                    </article>
                </section>
            </div>
            <!--end subtag4-->
        </div>
        <!--end tag1-->

        <div id="tag2" class="tag hidden">
            <header>
                <div class="arrow arrowTop"></div>
            </header>
            <section class="informationBox explanationBox">
                <article>
                    <h2>What is Shacu?</h2>
                    <p>
                        Shacu is an application to share culture through QR codes. For this you have to chase a few points distributed where you will find the QR. Scan them with your mobile from the application and access or change the cultural contents.
                    </p>
                    <p>
                        ShaCu lets you share voice, videos, small texts, such as chapter books or poems. And much more. Be the first to share with shacu.
                    </p>
                </article>
            </section>
            <footer>
            <!--hunidden when modificate-->
                <div class="arrow arrowBottom"  style="display:none"></div>
            </footer>
        </div>
        
        <!--modificable-->
        <div id="tag3" class="tag hidden">
            <header>
                <div class="arrow arrowTop"></div>
            </header>
            <section class="informationBox explanationBox">
                <article>
                    <h2>What is EXAMPLE?</h2>
                    <p>
                        EXAMPLE is an application to share culture through QR codes. For this you have to chase a few points distributed where you will find the QR. Scan them with your mobile from the application and access or change the cultural contents.
                    </p>
                    <p>
                        EXAPLE EXAMPLE lets you share voice, videos, small texts, such as chapter books or poems. And much more. Be the first to share with shacu.
                    </p>
                </article>
            </section>
            <!--<footer>-->
            <!--    <div class="arrow arrowBottom"></div>-->
            <!--</footer>-->
        </div>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script type="text/javascript" src="./scripts/clipboard.min.js"></script>
    <script type="text/javascript" src="./scripts/main.js"></script>
    <script type="text/javascript" src="./scripts/validate.js"></script>
    <script type="text/javascript" src="./scripts/JSBox.js"></script>
</body>

</html>
