import jsPDF, { TextOptionsLight } from "jspdf";

export class PdfGenerator {
  width = 220;
  leftBorder = 10;
  rightBorder = 10;
  borderY = 20;
  y = 20;
  maxWidth = 190;

  doc: jsPDF;

  constructor() {
    this.doc = new jsPDF();
    this.doc.setFontSize(12);
    console.log("fontsize", this.doc.getFontSize());
  }

  addText(str: string, opt?: { align: TextOptionsLight["align"] }) {
    this._addText(str, {
      align: opt?.align,
      bold: false,
      scale: 1,
    });
  }
  addTitle1(str: string, opt?: { align: TextOptionsLight["align"] }) {
    this._addText(str, {
      align: opt?.align,
      bold: true,
      scale: 1.5,
    });
  }
  addTitle2(str: string, opt?: { align: TextOptionsLight["align"] }) {
    this._addText(str, {
      align: opt?.align,
      bold: true,
      scale: 1.2,
    });
  }
  addTitle3(str: string, opt?: { align: TextOptionsLight["align"] }) {
    this._addText(str, {
      align: opt?.align,
      bold: true,
      scale: 1,
    });
  }

  addBulletPoint(str: string) {
    this.doc.text("• ", this.leftBorder, this.y);
    const { w } = this.doc.getTextDimensions("• ");

    const leftBorder = this.leftBorder;
    this.leftBorder += w;

    this._addText(str, {
      align: "justify",
      bold: false,
      scale: 1,
    });

    this.leftBorder = leftBorder;
  }

  addSpace(space: number = 1) {
    this.y += space;
  }
  addHorizontalLine() {
    this.doc.line(
      this.leftBorder,
      this.y,
      this.width - this.leftBorder - this.rightBorder,
      this.y
    );
    this.y += this.doc.getLineHeight() * 0.5;
  }

  getPdfString() {
    return this.doc.output("dataurlstring");
  }

  addPage() {
    this.doc.addPage();
    this.y = this.borderY;
  }

  private _addText(
    str: string,
    opt: {
      align: TextOptionsLight["align"];
      scale: number;
      bold: boolean;
    }
  ) {
    const x = this.getXByAlign(opt.align ?? "justify");

    const fontSize = this.doc.getFontSize();
    const font = this.doc.getFont();

    this.doc.setFontSize(fontSize * opt.scale);
    if (opt.bold) this.doc.setFont(font.fontName, "", "bold");

    this.doc.text(str, x, this.y, {
      maxWidth: this.maxWidth,
      align: opt?.align ?? "justify",
    });

    const { h } = this.doc.getTextDimensions(str, { maxWidth: this.maxWidth });
    this.y += h + 1;

    this.doc.setFontSize(fontSize);
    if (opt.bold) this.doc.setFont(font.fontName, "", "normal");
  }

  private getXByAlign(align: TextOptionsLight["align"]): number {
    if (align === "center") return this.width / 2;
    return this.leftBorder;
  }
}
