export const cursorPosToBoardPos = (event, squareSize) => {
    const rect = boardCanvas.getBoundingClientRect();

    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    if (x < 0 || y < 0 || x > boardCanvas.width || y > boardCanvas.height)
        return;

    x = Math.floor(x / squareSize);
    y = Math.floor(y / squareSize);

    return { x, y };
};
