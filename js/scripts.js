console.log(
    "     __           _   _                         ___ _     _\n" +
    "  /\\ \\ \\___  _ __| |_| |__   ___ _ __ _ __     / __\\ |__ (_)_ __   __ _\n" +
    " /  \\/ / _ \\| '__| __| '_ \\ / _ \\ '__| '_ \\   / /  | '_ \\| | '_ \\ / _` |\n" +
    "/ /\\  / (_) | |  | |_| | | |  __/ |  | | | | / /___| | | | | | | | (_| |\n" +
    "\\_\\ \\/ \\___/|_|   \\__|_| |_|\\___|_|  |_| |_| \\____/|_| |_|_|_| |_|\\__,_|\n" +
    "   ___                           ___                           _   _\n" +
    "  / __\\_ __ ___  _ __  _   _    / __\\___  _ ____   _____ _ __ | |_(_) ___  _ __\n" +
    " /__\\// '__/ _ \\| '_ \\| | | |  / /  / _ \\| '_ \\ \\ / / _ \\ '_ \\| __| |/ _ \\| '_ \\\n" +
    "/ \\/  \\ | | (_) | | | | |_| | / /__| (_) | | | \\ V /  __/ | | | |_| | (_) | | | |\n" +
    "\\_____/_|  \\___/|_| |_|\\__, | \\____/\\___/|_| |_|\\_/ \\___|_| |_|\\__|_|\\___/|_| |_|\n" +
    "                       |___/\n" +
    "\n" +
    "NCBC - 华北马聚 | Web by JessDaodao、Leonsu_L & Raku Inkyetta\n" +
    "网站已在GitHub开源：https://github.com/NorthernChinaBronyConvention/NCBC_Web"
);

function initLoader() {
    const loader = document.getElementById('loader');
    const loaderContent = document.getElementById('loader-content');
    
    if (!loader) return;
    
    const hasLoaded = sessionStorage.getItem('siteLoaded');
    const hasSpecialLoader = document.querySelector('meta[name="ncbc-loader"][content="special"]');
    const quickLoaderContent = document.getElementById('quick-loader-content');
    const fullLoaderContent = document.getElementById('full-loader-content');
    
    if (!hasLoaded && !hasSpecialLoader) {
        const linesData = Array.from(fullLoaderContent.querySelectorAll('.loader-line')).map(line => ({
            html: line.innerHTML,
            delay: parseInt(line.getAttribute('data-delay')) || 0,
            changeAfter: parseInt(line.getAttribute('data-change-after')) || null,
            changeTo: line.getAttribute('data-change-to') || null
        }));
        
        showTerminalAnimation(loaderContent, linesData, () => {
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.style.display = 'block';
                sessionStorage.setItem('siteLoaded', 'true');
            }, 1000);
        });
    } else {
        loaderContent.innerHTML = quickLoaderContent.innerHTML;
        showQuickLoader(loaderContent, () => {
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.style.display = 'block';
            }, 1000);
        });
    }
}

function showTerminalAnimation(container, content, callback) {
    let currentIndex = 0;
    const lines = [];
    
    function addLine() {
        if (currentIndex >= content.length) {
            setTimeout(() => {
                container.innerHTML = '';
                if (callback) callback();
            }, 2000);
            return;
        }
        
        const lineData = content[currentIndex];
        const line = document.createElement('div');
        line.className = 'loader-line';
        line.innerHTML = lineData.html;
        container.appendChild(line);
        lines.push(line);
        
        setTimeout(() => {
            line.classList.add('visible');
            
            if (lineData.changeAfter && lineData.changeTo) {
                setTimeout(() => {
                    line.innerHTML = lineData.changeTo;
                    checkScroll();
                }, lineData.changeAfter);
            }
            
            checkScroll();
        }, 10);
        
        currentIndex++;
        if (currentIndex < content.length) {
            setTimeout(addLine, lineData.delay || 300);
        } else {
            setTimeout(addLine, 1000);
        }
    }
    
    function checkScroll() {
        const containerRect = container.getBoundingClientRect();
        const lastLine = lines[lines.length - 1];
        const lastLineRect = lastLine.getBoundingClientRect();
        
        if (lastLineRect.bottom > containerRect.bottom) {
            const scrollAmount = lastLineRect.bottom - containerRect.bottom + 10;
            container.scrollTop += scrollAmount;
        }
    }
    addLine();
}

function showQuickLoader(container, callback) {
    const lines = container.querySelectorAll('.loader-line');
    let currentIndex = 0;
    
    function showNextLine() {
        if (currentIndex >= lines.length) {
            setTimeout(() => {
                container.innerHTML = '';
                if (callback) callback();
            }, 1000);
            return;
        }
        
        const line = lines[currentIndex];
        const delay = parseInt(line.getAttribute('data-delay')) || 200;
        
        setTimeout(() => {
            line.classList.add('visible');
            currentIndex++;
            showNextLine();
        }, delay);
    }
    
    showNextLine();
}

document.addEventListener('DOMContentLoaded', function() {
    initLoader();
});