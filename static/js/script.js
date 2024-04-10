document.addEventListener('DOMContentLoaded', function() {
     // Initialize elements and context for drawing
     const paintDiv = document.getElementById('paint');
     const canvas = document.createElement('canvas');
     canvas.id = 'actual-canvas'; // Use a unique ID for the canvas
     paintDiv.appendChild(canvas);
     const ctx = canvas.getContext('2d');
     
     let isDrawing = false;
     let activeTool = 'pen';
     let penSizeSlider = document.querySelector('#pen-tool-container .wired-slider');
     let eraserSizeSlider = document.querySelector('#eraser-tool-container .wired-slider');

 

    function resizeCanvas() {
        const paintDiv = document.getElementById('paint');
        canvas.width = paintDiv.offsetWidth;
        canvas.height = paintDiv.offsetHeight;
    }

    function getMousePos(evt) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    function startDrawing(e) {
        isDrawing = true;
        const mousePos = getMousePos(e);
        ctx.beginPath();
        ctx.moveTo(mousePos.x, mousePos.y);
    }

    function draw(e) {
        if (!isDrawing) return;
        const mousePos = getMousePos(e);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();
    }

    function stopDrawing() {
        if (isDrawing) {
            ctx.closePath();
            isDrawing = false;
        }
    }

    //pen tool
    function activatePen(){
        canvas.removeEventListener('click', onCanvasClick);
        ctx.globalCompositeOperation = 'source-over';
            ctx.lineWidth = penSizeSlider.value;
            ctx.lineCap = "round"
            ctx.strokeStyle = '#000000';
            canvas.addEventListener('mousedown', startDrawing);
            canvas.addEventListener('mousemove', draw);
            canvas.addEventListener('mouseup', stopDrawing);
            canvas.addEventListener('mouseout', stopDrawing);
    }

    //eraser tool
    function activateEraser(){
        canvas.removeEventListener('click', onCanvasClick);
        ctx.globalCompositeOperation = 'destination-out';
            let eraserSize = eraserSizeSlider.value; 
            ctx.lineWidth = eraserSize;
            ctx.lineCap = "round"
            canvas.addEventListener('mousedown', startDrawing);
            canvas.addEventListener('mousemove', draw);
            canvas.addEventListener('mouseup', stopDrawing);
            canvas.addEventListener('mouseout', stopDrawing);
    }
    //pixel getter setter 
    function getPixelData(x,y, color) {
        return ctx.getImageData(x, y, 1, 1).data;

    }
    function setPixelData(x, y, color) {
        let fillArea = ctx.createImageData(1, 1);
        fillArea.data[0] = color[0];
        fillArea.data[1] = color[1];
        fillArea.data[2] = color[2];
        fillArea.data[3] = color[3];
        ctx.putImageData(fillArea, x, y);
    }

    //flood fill algorithm bfs method
    function floodFill(startX, startY, fillColor){
        console.log("Flood fill running")
        let startColor = getPixelData(startX, startY);
        if (startColor.every((val, i) => val === fillColor[i]))
            return;
        function pixelMatch(x, y){
            let currentColor = getPixelData(x, y);
            return currentColor.every((val, i) => val === startColor[i]);
        }

        let pixelsToCheck = [{x: startX, y: startY}];
        while (pixelsToCheck. length > 0)
        {
            let {x, y} = pixelsToCheck.pop()
            if (!pixelMatch(x,y))
                continue;
            setPixelData(x, y, fillColor);

            [[x - 1, y], 
            [x + 1, y],
            [x, y - 1],
            [x, y + 1]].forEach(([nx, ny]) => {
                if (nx >= 0 && nx < canvas.width && ny >= 0 && ny < canvas.height)
                {
                    pixelsToCheck.push({x: nx, y: ny});
                }
            });
        }
    }

    let onCanvasClick;
    //bucket tool
    function activateBucket(){
        onCanvasClick = function(e){
            const mousePos = getMousePos(e);
            floodFill(Math.floor(mousePos.x), Math.floor(mousePos.y), 
            [0, 0, 0, 255]);
        }
        canvas.addEventListener('click', onCanvasClick);
    }

    function deactivateBucket() {
        canvas.removeEventListener('click', onCanvasClick);
    }

    //clears canvas
    function clearAll(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    //deactivates tools 
    function deactivateAllTools() {
        canvas.removeEventListener('mousedown', startDrawing);
        canvas.removeEventListener('mousemove', draw);
        canvas.removeEventListener('mouseup', stopDrawing);
        canvas.removeEventListener('mouseout', stopDrawing);
        const buttons = document.querySelectorAll('.toolbar button');
        buttons.forEach(button => button.classList.remove('selected'));
    }

    //Tool Selection
    function selectTool(tool) {
        deactivateAllTools();

        document.querySelectorAll('.slider-container').forEach(slider => {
            slider.style.display = 'none';
        });
    
        if (tool === 'pen') {
            document.querySelector('#pen-tool-container .slider-container').style.display = 'block';
            console.log('pen')
            activatePen();
        } else if (tool === 'eraser') {
            document.querySelector('#eraser-tool-container .slider-container').style.display = 'block';
            console.log('eraser');
            activateEraser();
        }
        else if (tool === 'bucket'){
            console.log('bucket')
            activateBucket();
        }

    
        document.querySelectorAll('.toolbar button').forEach(button => {
            button.classList.remove('selected');
        });
    
        document.getElementById(`${tool}-tool`).classList.add('selected');
    
        activeTool = tool;
    }

    // Event listeners for tool buttons
    document.getElementById('pen-tool').addEventListener('click', () => selectTool('pen'));
    document.getElementById('eraser-tool').addEventListener('click', () => selectTool('eraser'));
    document.getElementById('bucket-tool').addEventListener('click', () => selectTool('bucket'));
    document.getElementById('clear-tool').addEventListener('click', clearAll);

    
    
    //Event listeners for sliders
    penSizeSlider.addEventListener('input', function() {
        if (activeTool === 'pen') {
            ctx.lineWidth = this.value;
        }
    });
    
    eraserSizeSlider.addEventListener('input', function() {
        if (activeTool === 'eraser') {
            ctx.lineWidth = this.value;
        }
    });
    
    // Initialize canvas size and set default tool
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    selectTool('pen'); //pen default tool

    document.getElementById('done-button').addEventListener('click', function(){
        const dataURL = canvas.toDataURL('image/png');
        downloadImage(dataURL, 'Drawing.png');

    });

    // Random Pokemon Selection

    document.getElementById('random_pokemon').addEventListener('click', function(){
        var randomNumber = Math.floor(Math.random() * 151) + 1;
        document.getElementById('pokemon-name').textContent = "Pokemon: " + randomNumber;
        console.log(randomNumber);
        document.getElementById('pokemonImage').src = `/static/images/${randomNumber}.png`;
    });
    

    function togglePokemonDropdown() {
        document.getElementById("pokemonDropdown").classList.toggle("show");
      }
      
      function filterPokemon() {
        var input, filter, a;
        input = document.getElementById("pokemonSearchInput");
        filter = input.value.toUpperCase();
        var dropdown = document.getElementById("pokemonDropdown");
        a = dropdown.getElementsByTagName("a");
        for (let i = 0; i < a.length; i++) {
          let txtValue = a[i].textContent || a[i].innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
          } else {
            a[i].style.display = "none";
          }
        }
      }
    
      function updateImage() {
        var selectedPokemon = document.getElementById('pokemonSelector').value;
        var imagePath = `/static/images/${selectedPokemon}.png`;
        
        document.getElementById('pokemonImage').src = imagePath;
      }
      
      function downloadImage(dataURL, filename) {
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
      
})
