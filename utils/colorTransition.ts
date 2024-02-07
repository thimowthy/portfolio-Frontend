export const setColor = (temperatura: number) => {

    const red = Math.round((temperatura - 36.5) * (255 / 1.5));
    const green = Math.round(255 - (temperatura - 36.5) * (255 / 1.5));
    
    return `rgba(${red}, ${green}, 0, 1)`;

  };