$(document).ready(function() {
    arrowJob();
    tagJob();
    navJob();
    mailListeners();
});

// function pu on listener to mail tags popup generate 
function mailListeners() {
    var context = "body";
    $(".mailPopUp").click(function() { 
        mailPopupJob($(this).attr('id'), context);
    }); 
}


// popup job generates a pop up with the corresponde email
function mailPopupJob(idMail, context) {
    darkenUndarkeWindow();
    var mailsArray = [
        "carlos.troyano.carmona@gmail.com", 
        "alu0100886870@ull.edu.es", 
        "alu0100825893@ull.edu.es"
    ];
    
    var clases = {
        popup: "mailPopUpWindow",
        topWidow: "",
        content: "popoupContentMail"
    }
    
    var text = {
        content: mailsArray[Number(idMail.replace("mail", "")) - 1],
        title: "Mail"
        };
    
    var pop = popup(clases, text);

    var copyClipboard = $('<img />', {
        "class": 'copyClipboard',
        "src" : "./images/clipboardCopy.png",
        "data-clipboard-action":"copy", 
        "data-clipboard-target" :  ".contentText"   
    });
    
    var clipboard = new Clipboard('.copyClipboard');

    clipboard.on('success', function(e) {
        console.log(e);
    });

    clipboard.on('error', function(e) {
        console.error(e);
    });
    
   $(pop[0].firstChild).append(copyClipboard) 
   $(context).append(pop);
    
}
// finish mailPopupJob

// fuction to darken or undarken window when push popoup
function darkenUndarkeWindow() {
    if($(".coverScreen").length == 0) {
        var cover = $('<div />', {
            "class": 'coverScreen darkenWindow'
        });  
        $("body").append(cover);
    } else {
        $(".coverScreen").remove();
    }
}

// finish darkenUndarkeWindow

// custom function popup for create popups in aplicaction 
function popup(clases, innerText) {
    clases = (clases === undefined || typeof clases === 'undefined') ? "" : clases;
    innerText = (innerText === undefined || typeof innerText === 'undefined') ? "" : innerText;
    var popup = $('<div />', {
        "class": 'popup ' + clases.popup,
        });  
        
    var content = $('<div />', {
        "class": 'popoupContent ' + clases.content,
    });  
        
    var text = $('<div />', {
        "class": 'contentText ' ,
        text: innerText.content
    });   
        
    var topWidow = $('<div />', {
        "class": 'topWidow ' + clases.topWidow,
        text: innerText.title
    });
            
    var closeWindow = $('<img />', {
        "class": 'colseWindow',
        "src" : "./images/closeWhite.png",
        click: function(e){
            e.preventDefault();
            darkenUndarkeWindow();
            popup.remove();
        }
    });
    topWidow.append(closeWindow);
    content.append(text);
    popup.append(content);
    popup.append(topWidow);
    return popup;
        
}
// finish popup

// Tag job its a function to control the slide with tags.
function tagJob() {
    $("#tag1 .arrowBottom").click(function() {

        $("#tag1").hide("drop", {
            direction: "down"
        }, "slow", function() {
            $("#tag2").show("drop", {
                direction: "up"
            }, "slow");

        });
    });
    
    $("#tag2 .arrowBottom").click(function() {

        $("#tag2").hide("drop", {
            direction: "down"
        }, "slow", function() {
            $("#tag3").show("drop", {
                direction: "up"
            }, "slow");

        });
    });

    $("#tag2 .arrowTop").click(function() {
        $("#tag2").hide("drop", {
            direction: "up"
        }, "slow", function() {
            $("#tag1").show("drop", {
                direction: "down"
            }, "slow");

        });
    });

    $("#tag3 .arrowTop").click(function() {
        $("#tag3").hide("drop", {
            direction: "up"
        }, "slow", function() {
            $("#tag2").show("drop", {
                direction: "down"
            }, "slow");

        });
    });
}

// Nav Job its a function to control the slide with the subtags in the nav menu.
function navJob() {
    var activeTag = "#subtag1";
    var activeLink = ""
    var freeFrame = true;
    
    
        $("#logoTitle").click(function() {
            if (activeTag != "#subtag1" && freeFrame) {
                freeFrame = false;
                $(activeTag).hide("drop", {
                    direction: "right"
                }, "slow", function() {
                    $("#subtag1").show("drop", {
                        direction: "left"
                    }, "slow", function() {
                        $(activeLink).removeClass("active");
                        activeLink = "";
                        freeFrame = true;
                    });
                    activeTag = "#subtag1";
                });
            }
        });
        
    $("#aboutLink").click(function() {
        if (activeTag != "#subtag2" && freeFrame) {
            freeFrame = false;
            var frameNumber = Number(activeTag.replace("#subtag", ""));
            var directionHide = frameNumber < 2 ? "left" : "right";  
            var directionShow = frameNumber < 2 ? "right" : "left";
            $(activeTag).hide("drop", {
                direction: directionHide
            }, "slow", function() {
                $("#subtag2").show("drop", {
                    direction: directionShow
                }, "slow", function() {
                    $(activeLink).removeClass("active");
                    activeLink = "#aboutLink";
                    $(activeLink).addClass("active");
                    freeFrame = true;
                });
                activeTag = "#subtag2";
            });
        }
    });


    $("#contactLink").click(function() {
        if (activeTag != "#subtag4" && freeFrame) {
            freeFrame = false;
            var frameNumber = Number(activeTag.replace("#subtag", ""));
            var directionHide = frameNumber < 4 ? "left" : "right";  
            var directionShow = frameNumber < 4 ? "right" : "left";
            $(activeTag).hide("drop", {
                direction: directionHide
            }, "slow", function() {
                $("#subtag4").show("drop", {
                    direction: directionShow
                }, "slow", function() {
                    $(activeLink).removeClass("active");
                    activeLink = "#contactLink";
                    $(activeLink).addClass("active");
                    freeFrame = true;
                });
                activeTag = "#subtag4";
            });
        }
    });

    $("#dowloadLink").click(function() {
        if (activeTag != "#subtag3" && freeFrame) {
            freeFrame = false;
            var frameNumber = Number(activeTag.replace("#subtag", ""));
            var directionHide = frameNumber < 3 ? "left" : "right";  
            var directionShow = frameNumber < 3 ? "right" : "left";
            $(activeTag).hide("drop", {
                direction: directionHide
            }, "slow", function() {
                $("#subtag3").show("drop", {
                    direction: directionShow
                }, "slow", function() {
                    $(activeLink).removeClass("active");
                    activeLink = "#dowloadLink";
                    $(activeLink).addClass("active");
                    freeFrame = true;
                });
                activeTag = "#subtag3";
            });
        }
    });
}
// finsih nav jov

// Arrow Job its a function to control transitions with the arrow sprite sheet.
function arrowJob() {
    
    $(".arrow").mouseover(
        function() {
            $(this).addClass("arrowAnimatedDark");
            $(this).one('animationend webkitAnimationEnd', function() {
                $(".arrowAnimatedDark").off("animationend webkitAnimationEnd");
                $(this).removeClass("arrowAnimatedDark");
                $(this).addClass("arrwBottomBlack");
            });
        }).mouseleave(
        function() {
            $(this).addClass("arrowAnimatedLight");
            $(this).one('animationend webkitAnimationEnd', function() {
                $(".arrowAnimatedLight").off("animationend webkitAnimationEnd");
                $(this).removeClass("arrowAnimatedLight");
                $(this).removeClass("arrwBottomBlack");
            });
        });
}
// finish arrow job

