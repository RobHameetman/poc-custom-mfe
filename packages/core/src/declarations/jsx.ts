import {
  Element,
  FC,
  NodeList,
  Props,
  PropsWithKey,
  Renderable,
} from '../rendering';

declare global {
  export namespace JSX {
    export function createElement<P = Renderable<HTMLElement>>(
      type: string,
      props?: PropsWithKey<P> | null,
      ...children: NodeList<Props>
    ): Element<P>;
    export function createElement<P = Props>(
      type: FC<P>,
      props?: PropsWithKey<P> | null,
      ...children: NodeList<Props>
    ): Element<P>;

    export interface IntrinsicElements extends HTML.IntrinsicElements {
      [tagName: string]: unknown;
    }

    /**
     * This line was added so that rollup won't complain about `createElement`
     * using "private" types.
     */
    export { RenderableElement as Element };

    export type RenderableElement = Renderable<Element<unknown>>;
  }
}

export namespace HTML {
  export interface IntrinsicElements {
    a: Renderable<HTMLAnchorElement>;
    abbr: Renderable<HTMLDivElement>;
    address: Renderable<HTMLDivElement>;
    animate: Renderable<SVGAnimateElement>;
    area: Renderable<HTMLAreaElement>;
    article: Renderable<HTMLDivElement>;
    aside: Renderable<HTMLDivElement>;
    audio: Renderable<HTMLAudioElement>;
    b: Renderable<HTMLSpanElement>;
    base: Renderable<HTMLBaseElement>;
    bdi: Renderable<HTMLDivElement>;
    bdo: Renderable<HTMLDivElement>;
    big: Renderable<HTMLDivElement>;
    blockquote: Renderable<HTMLQuoteElement>;
    body: Renderable<HTMLBodyElement>;
    br: Renderable<HTMLBRElement>;
    button: Renderable<HTMLButtonElement>;
    canvas: Renderable<HTMLCanvasElement>;
    caption: Renderable<HTMLTableCaptionElement>;
    circle: Renderable<SVGCircleElement>;
    cite: Renderable<HTMLSpanElement>;
    clipPath: Renderable<SVGClipPathElement>;
    code: Renderable<HTMLSpanElement>;
    col: Renderable<HTMLTableColElement>;
    colgroup: Renderable<HTMLTableColElement>;
    data: Renderable<HTMLDataElement>;
    datalist: Renderable<HTMLDataListElement>;
    dd: Renderable<HTMLSpanElement>;
    defs: Renderable<SVGDefsElement>;
    del: Renderable<HTMLModElement>;
    desc: Renderable<SVGDescElement>;
    details: Renderable<HTMLElement>;
    dfn: Renderable<HTMLDivElement>;
    dialog: Renderable<HTMLDialogElement>;
    div: Renderable<HTMLDivElement>;
    dl: Renderable<HTMLDListElement>;
    dt: Renderable<HTMLSpanElement>;
    ellipse: Renderable<SVGEllipseElement>;
    em: Renderable<HTMLSpanElement>;
    embed: Renderable<HTMLEmbedElement>;
    feBlend: Renderable<SVGFEBlendElement>;
    feColorMatrix: Renderable<SVGFEColorMatrixElement>;
    feComponentTransfer: Renderable<SVGFEComponentTransferElement>;
    feComposite: Renderable<SVGFECompositeElement>;
    feConvolveMatrix: Renderable<SVGFEConvolveMatrixElement>;
    feDiffuseLighting: Renderable<SVGFEDiffuseLightingElement>;
    feDisplacementMap: Renderable<SVGFEDisplacementMapElement>;
    feDistantLight: Renderable<SVGFEDistantLightElement>;
    feDropShadow: Renderable<SVGFEDropShadowElement>;
    feFlood: Renderable<SVGFEFloodElement>;
    feFuncA: Renderable<SVGFEFuncAElement>;
    feFuncB: Renderable<SVGFEFuncBElement>;
    feFuncG: Renderable<SVGFEFuncGElement>;
    feFuncR: Renderable<SVGFEFuncRElement>;
    feGaussianBlur: Renderable<SVGFEGaussianBlurElement>;
    feImage: Renderable<SVGFEImageElement>;
    feMerge: Renderable<SVGFEMergeElement>;
    feMergeNode: Renderable<SVGFEMergeNodeElement>;
    feMorphology: Renderable<SVGFEMorphologyElement>;
    feOffset: Renderable<SVGFEOffsetElement>;
    fePointLight: Renderable<SVGFEPointLightElement>;
    feSpecularLighting: Renderable<SVGFESpecularLightingElement>;
    feSpotLight: Renderable<SVGFESpotLightElement>;
    feTile: Renderable<SVGFETileElement>;
    feTurbulence: Renderable<SVGFETurbulenceElement>;
    fieldset: Renderable<HTMLFieldSetElement>;
    figcaption: Renderable<HTMLSpanElement>;
    figure: Renderable<HTMLSpanElement>;
    filter: Renderable<SVGFilterElement>;
    footer: Renderable<HTMLDivElement>;
    foreignObject: Renderable<SVGForeignObjectElement>;
    form: Renderable<HTMLFormElement>;
    g: Renderable<SVGGElement>;
    h1: Renderable<HTMLHeadingElement>;
    h2: Renderable<HTMLHeadingElement>;
    h3: Renderable<HTMLHeadingElement>;
    h4: Renderable<HTMLHeadingElement>;
    h5: Renderable<HTMLHeadingElement>;
    h6: Renderable<HTMLHeadingElement>;
    head: Renderable<HTMLHeadElement>;
    header: Renderable<HTMLDivElement>;
    hgroup: Renderable<HTMLDivElement>;
    hr: Renderable<HTMLHRElement>;
    html: Renderable<HTMLHtmlElement>;
    i: Renderable<HTMLSpanElement>;
    iframe: Renderable<HTMLIFrameElement>;
    image: Renderable<SVGImageElement>;
    img: Renderable<HTMLImageElement>;
    input: Renderable<HTMLInputElement>;
    ins: Renderable<HTMLModElement>;
    kbd: Renderable<HTMLSpanElement>;
    keygen: Renderable<HTMLElement>;
    label: Renderable<HTMLLabelElement>;
    legend: Renderable<HTMLLegendElement>;
    li: Renderable<HTMLLIElement>;
    line: Renderable<SVGLineElement>;
    linearGradient: Renderable<SVGLineElement>;
    link: Renderable<HTMLLinkElement>;
    main: Renderable<HTMLDivElement>;
    map: Renderable<HTMLMapElement>;
    mark: Renderable<HTMLDivElement>;
    marker: Renderable<SVGMarkerElement>;
    mask: Renderable<SVGMaskElement>;
    menu: Renderable<HTMLMenuElement>;
    menuitem: Renderable<HTMLDivElement>;
    meta: Renderable<HTMLMetaElement>;
    metadata: Renderable<SVGMetadataElement>;
    meter: Renderable<HTMLMeterElement>;
    nav: Renderable<HTMLDivElement>;
    noscript: Renderable<HTMLDivElement>;
    object: Renderable<HTMLObjectElement>;
    ol: Renderable<HTMLOListElement>;
    optgroup: Renderable<HTMLOptGroupElement>;
    option: Renderable<HTMLOptionElement>;
    output: Renderable<HTMLOutputElement>;
    p: Renderable<HTMLParagraphElement>;
    param: Renderable<HTMLParamElement>;
    path: Renderable<SVGPathElement>;
    pattern: Renderable<SVGPatternElement>;
    picture: Renderable<HTMLPictureElement>;
    polygon: Renderable<SVGPolygonElement>;
    polyline: Renderable<SVGPolylineElement>;
    pre: Renderable<HTMLPreElement>;
    progress: Renderable<HTMLProgressElement>;
    q: Renderable<HTMLQuoteElement>;
    radialGradient: Renderable<SVGRadialGradientElement>;
    rect: Renderable<SVGRectElement>;
    rp: Renderable<HTMLSpanElement>;
    rt: Renderable<HTMLSpanElement>;
    ruby: Renderable<HTMLDivElement>;
    s: Renderable<HTMLSpanElement>;
    samp: Renderable<HTMLSpanElement>;
    script: Renderable<HTMLScriptElement>;
    section: Renderable<HTMLDivElement>;
    select: Renderable<HTMLSelectElement>;
    slot: Renderable<HTMLSlotElement>;
    small: Renderable<HTMLSpanElement>;
    source: Renderable<HTMLSourceElement>;
    span: Renderable<HTMLSpanElement>;
    stop: Renderable<SVGStopElement>;
    strong: Renderable<HTMLSpanElement>;
    style: Renderable<HTMLStyleElement>;
    sub: Renderable<HTMLSpanElement>;
    summary: Renderable<HTMLSpanElement>;
    sup: Renderable<HTMLSpanElement>;
    svg: Renderable<SVGSVGElement>;
    switch: Renderable<SVGSwitchElement>;
    symbol: Renderable<SVGSymbolElement>;
    table: Renderable<HTMLTableElement>;
    tbody: Renderable<HTMLTableSectionElement>;
    td: Renderable<HTMLTableDataCellElement>;
    text: Renderable<SVGTextElement>;
    textarea: Renderable<HTMLTextAreaElement>;
    textPath: Renderable<SVGTextPathElement>;
    tfoot: Renderable<HTMLTableSectionElement>;
    th: Renderable<HTMLTableHeaderCellElement>;
    thead: Renderable<HTMLTableSectionElement>;
    time: Renderable<HTMLTimeElement>;
    title: Renderable<HTMLTitleElement>;
    tr: Renderable<HTMLTableRowElement>;
    track: Renderable<HTMLTrackElement>;
    tspan: Renderable<SVGTSpanElement>;
    u: Renderable<HTMLSpanElement>;
    ul: Renderable<HTMLUListElement>;
    use: Renderable<SVGUseElement>;
    var: Renderable<HTMLSpanElement>;
    video: Renderable<HTMLVideoElement>;
    view: Renderable<SVGViewElement>;
    wbr: Renderable<HTMLSpanElement>;
  }
}

export { HTML as JSX };
