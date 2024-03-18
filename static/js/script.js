document.addEventListener('DOMContentLoaded', function() {
    const paintDiv = document.getElementById('paint');
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    paintDiv.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        const toolbarHeight = document.querySelector('.toolbar').offsetHeight;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - toolbarHeight;
    }

    resizeCanvas();

    window.addEventListener('resize', function() {
        resizeCanvas();
    });

    let isDrawing = false;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000';

    function startDrawing(e) {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    function draw(e) {
        if (!isDrawing) return;
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
    }

    function stopDrawing() {
        isDrawing = false;
        ctx.closePath();
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    document.getElementById('pen-tool').addEventListener('click', function() {
        selectTool('pen');
    });

    document.getElementById('eraser-tool').addEventListener('click', function() {
        selectTool('eraser');
    });

    function selectTool(tool) {
        ctx.globalCompositeOperation = 'source-over';

        document.querySelectorAll('.toolbar button').forEach(button => {
            button.classList.remove('selected');
        });
        document.getElementById(`${tool}-tool`).classList.add('selected');

        if (tool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = 10;
        } else {
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 5;
        }
    }

    selectTool('pen');
});
