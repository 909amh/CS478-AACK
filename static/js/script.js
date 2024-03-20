document.addEventListener('DOMContentLoaded', function() {
    const toolbar = document.querySelector('.toolbar');
    const paintDiv = document.getElementById('paint');
    const canvas = document.createElement('canvas');
    const penSizeSlider = document.getElementById('pen-size');
    const eraserSizeSlider = document.getElementById('eraser-size');
    canvas.id = 'canvas';
    paintDiv.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let activeTool = 'pen';

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - toolbar.offsetHeight;
        canvas.style.top = `${toolbar.offsetHeight}px`;
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

    function activatePen(){
        ctx.globalCompositeOperation = 'source-over';
            ctx.lineWidth = penSizeSlider.value;
            ctx.lineCap = "round"
            ctx.strokeStyle = '#000000';
            canvas.addEventListener('mousedown', startDrawing);
            canvas.addEventListener('mousemove', draw);
            canvas.addEventListener('mouseup', stopDrawing);
            canvas.addEventListener('mouseout', stopDrawing);
    }

    function activateEraser(){
        ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = document.getElementById('eraser-size').value;
            ctx.lineCap = "round"
            canvas.addEventListener('mousedown', startDrawing);
            canvas.addEventListener('mousemove', draw);
            canvas.addEventListener('mouseup', stopDrawing);
            canvas.addEventListener('mouseout', stopDrawing);
    }
    /*function getPixelData(x,y, color) {

    }
    function activateBucket() {

    }
    */
    function clearAll(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

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
            activatePen();
        } else if (tool === 'eraser') {
            document.querySelector('#eraser-tool-container .slider-container').style.display = 'block';
            activateEraser();
        }
    
        document.querySelectorAll('.toolbar button').forEach(button => {
            button.classList.remove('selected');
        });
    
        document.getElementById(`${tool}-tool`).classList.add('selected');
    
        activeTool = tool;
        console.log(`Tool switched. Current active tool: ${activeTool}`);
    }

    // Event listeners for tool buttons
    document.getElementById('pen-tool').addEventListener('click', function() {
        selectTool('pen');
    });
    
    document.getElementById('eraser-tool').addEventListener('click', function() {
        selectTool('eraser');
    });
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
    activatePen();
});
