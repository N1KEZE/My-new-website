var chat = document.getElementById('chat'),
    cli = document.getElementById('cli'),
    user = '',
    chatHistory = [],
    historyIndex = 0;

cli.addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
        var message = cli.value;
        chatHistory.push(capitalizeFirstLetter(message));
        cli.value = '';
        if (message !== 'clear') {
            appendMessage(message);
            processCommand(message); // Process the command
        } else {
            chat.innerHTML = '';
        }
    }
});


cli.addEventListener('keydown', function(event) {
    /* navigate through the chatHistory array using the arrows keys */
    if (event.keyCode === 38 && chatHistory.length > 0) {               // arrow up
        if (historyIndex >= 0 && historyIndex < chatHistory.length) {
            cli.value = '';
            historyIndex += 1;
            cli.value = chatHistory[chatHistory.length - historyIndex];
        }
    } else if (event.keyCode === 40 && chatHistory.length > 0) {        // arrow down
        if (historyIndex > 0) {
            cli.value = '';
            historyIndex -= 1;
            if (historyIndex != 0) {
                cli.value = chatHistory[chatHistory.length - historyIndex];
            } else {
                cli.value = chatHistory[chatHistory.length - 1];
            }
        }
   }
});




function processCommand(message) {
    var command = message.toLowerCase();
    switch (command) {
        case 'help':
			appendMessage('Available commands:\n- help: Get list of commands\n- clear: Clear the command history\n- date: Show current date\n- ip: Show current IP address\n- platform: Show platform information\n- google query: Search Google\n- discord: Get Discord info\n- exam: secret \n- youtube: Open YouTube channel\n- steam: Open Steam profile\n- funfact: Get a fun fact\n- joke: Get a joke\n- quote: Get an inspiring quote', false);
            break;
        case 'clear':
            chat.innerHTML = '';
            break;
        case 'date':
            var currentDate = new Date();
            var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var dateString = "Current date is: " + days[currentDate.getDay()] + " " + currentDate.getDate() + " " + months[currentDate.getMonth()] + " " + currentDate.getFullYear();
            appendMessage(dateString);
            break;
case 'ip':
    const apiUrls = [
        'https://ipv4.icanhazip.com',
        'https://api64.ipify.org?format=json',
        'https://api.ip.sb/ip',
        'https://api.myip.com',
        'https://api.ipify.org',
        'https://api.ipify.org?format=json',
        'https://ipapi.co/ip/',
        'https://ipinfo.io/ip',
        'https://api64.ipify.org?format=json',
        'https://v4.ident.me',
        'https://icanhazip.com',
        'https://ipv6.icanhazip.com',
        // Add more backup API URLs here
    ];

    const fetchIpAddress = async (urls) => {
        for (const url of urls) {
            try {
                const response = await fetch(url);
                const ip = await response.text();
                appendMessage('IP address: ' + ip);
                return; // Exit the loop if successful
            } catch (error) {
                console.error(`Error fetching IP address from ${url}:`, error);
            }
        }
        appendMessage('Error fetching IP address from all APIs');
    };

    fetchIpAddress(apiUrls);
    break;


	case 'user-agent':
    appendMessage('User Agent: ' + navigator.userAgent);
    break;
case 'time':
    var currentTime = new Date();
    var timeString = 'Current time is: ' + currentTime.toLocaleTimeString();
    appendMessage(timeString);
    break;
case 'google [query]':
    var query = message.substring(7); // Remove 'google ' from the message
    var searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(query);
    appendMessage('Searching Google for: ' + query);
    appendMessage('Search results: ' + searchUrl);
    break;
	case 'discord':
    appendMessage('Discord: collinondex');
    break;
	case 'joke':
    fetch('https://official-joke-api.appspot.com/random_joke')
        .then(response => response.json())
        .then(data => {
            appendMessage(data.setup + '\n' + data.punchline);
        })
        .catch(error => {
            appendMessage('Sorry, I couldn\'t fetch a joke right now.');
        });
    break;
case 'quote':
    fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
            appendMessage('"' + data.content + '" - ' + data.author);
        })
        .catch(error => {
            appendMessage('Sorry, I couldn\'t fetch a quote right now.');
        });
    break;
	case 'funfact':
    const funFacts = [
        'Did you know that honey never spoils?',
        'A group of flamingos is called a "flamboyance".',
        'The shortest war in history was between Britain and Zanzibar on August 27, 1896. Zanzibar surrendered after 38 minutes.',
        'The world\'s oldest known customer complaint is on a Babylonian clay tablet from 1750 BCE.',
    ];
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    appendMessage('Fun Fact: ' + randomFact);
    break;
	case 'exam':
    appendMessage('Website produced to you by https://examv1.info/');
    break;
case 'youtube':
    appendMessage('YouTube: https://www.youtube.com/CollinOnDex');
    break;
case 'steam':
    appendMessage('Steam: https://steamcommunity.com/id/cid1337/');
    break;
   case 'platform':
            var platformInfo = "Browser Name: " + navigator.appName + "\n" +
                               "Browser Version: " + navigator.appVersion + "\n" +
                               "User Agent: " + navigator.userAgent + "\n" +
                               "Cookies Enabled: " + navigator.cookieEnabled + "\n" +
                               "Java Enabled: " + navigator.javaEnabled() + "\n" +
                               "Screen Resolution: " + window.screen.width + " x " + window.screen.height + "\n" +
                               "Screen Color Depth: " + window.screen.pixelDepth + " bits per pixel";
            appendMessage(platformInfo);
            break;
        default:
            appendMessage('Command not recognized: ' + message);
            break;
    }
}

cli.addEventListener('keydown', function(event) {
    /* navigate through the chatHistory array using the arrows keys */
    if (event.keyCode === 38 && chatHistory.length > 0) {               // arrow up
        if (historyIndex >= 0 && historyIndex < chatHistory.length) {
            cli.value = '';
            historyIndex += 1;
            cli.value = chatHistory[chatHistory.length - historyIndex];
        }
    } else if (event.keyCode === 40 && chatHistory.length > 0) {        // arrow down
        if (historyIndex > 0) {
            cli.value = '';
            historyIndex -= 1;
            if (historyIndex != 0) {
                cli.value = chatHistory[chatHistory.length - historyIndex];
            } else {
                cli.value = chatHistory[chatHistory.length - 1];
            }
            
        }
   }
});

/* Append message to the chat */
function appendMessage(message) {
    // reset chat history index
    historyIndex = 0;
    // create message item
    var chatMessage = document.createElement('li');
    chatMessage.className = 'message';
    chatMessage.textContent = user+' > '+capitalizeFirstLetter(message);
    chat.appendChild(chatMessage);
    chatMessage.scrollIntoView();
}




/* Capitalize the first letter of the first word */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
