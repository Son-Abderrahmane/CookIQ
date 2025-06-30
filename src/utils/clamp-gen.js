function GenerateClamp(minVal, maxVal, minWidth, maxWidth)
{
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    maxWidth /= rootFontSize;
    minWidth /= rootFontSize;

    const slope = (maxVal - minVal) / (maxWidth - minWidth);
    const offset = minVal -minWidth * slope;

    return `clamp(${minVal}rem, ${(slope * 100).toFixed(4)}vw + ${offset.toFixed(4)}rem, ${maxVal}rem)`
}

export default GenerateClamp;