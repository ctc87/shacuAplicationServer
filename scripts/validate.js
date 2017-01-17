// Validate function controls the form inputs.
function validate() {
    var mail = document.getElementById('mail').value;
    var nom = document.getElementById('nom').value;
    var textarea = document.getElementById('subjectTextArea').value;

    if (nonBlank(nom)) {
        console.error("Not name");
        return false;
    };

    if (nonBlank(mail)) {
        console.error("Not mail");
        return false;
    };

    if (nonBlank(textarea)) {
        console.error("Not subject message");
        return false;
    };

    if (!validateEmail(mail)) {
        console.error("Not mail valid direction");
        return false;
    }
    return true;
}

// Validate Email its a function to check te correct form of a email.
function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

// Non Blank function its to check the inputs have content. 
function nonBlank(target) {
    return /^\s*$/.test(target);
}
