export const cursorPosToBoardPos = (event, canvas) => {
    const rect = canvas.getBoundingClientRect();

    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    if (x < 0 || y < 0 || x > canvas.width || y > canvas.height) return;

    x = Math.floor(x / (canvas.width / 8));
    y = Math.floor(y / (canvas.height / 8));

    return { x, y };
};
