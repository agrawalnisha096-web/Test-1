// Shared helpers for Trillet integration pages.
// Adapted verbatim from product-page-helpers.example.js + listicle-helpers.example.js
// (same house style: NAVY/BRONZE serif headings, product-shot callout, spec card).
const {Document,Packer,Paragraph,TextRun,BorderStyle,Table,TableRow,TableCell,WidthType,ShadingType}=require("docx");
const NAVY="16223C",INK="24303F",MUTED="5A6675",BRONZE="9A6B3F",GREEN="2E7D5B",RED="B4442E",RULE="D9DEE8",CODE="F4F5F7",ANS="EEF3F0",SHOT="EDF1F6";
const SERIF="Georgia",SANS="Calibri",MONO="Consolas";const CW=9360;const LINK="1B5E86";
function bd(c){const b={style:BorderStyle.SINGLE,size:4,color:c};return{top:b,bottom:b,left:b,right:b,insideHorizontal:b,insideVertical:b};}
function eyebrow(x){return new Paragraph({spacing:{after:50},children:[new TextRun({text:x.toUpperCase(),font:MONO,size:15,bold:true,color:BRONZE,characterSpacing:18})]});}
function H1(x){return new Paragraph({spacing:{after:70},children:[new TextRun({text:x,font:SERIF,size:34,bold:true,color:NAVY})]});}
function H2(x){return new Paragraph({spacing:{before:170,after:50},children:[new TextRun({text:x,font:SERIF,size:25,bold:true,color:NAVY})]});}
function H3(x){return new Paragraph({spacing:{before:110,after:16},children:[new TextRun({text:x,font:SANS,size:20,bold:true,color:NAVY})]});}
function kicker(x){return new Paragraph({spacing:{before:130,after:30},children:[new TextRun({text:x.toUpperCase(),font:MONO,size:14,bold:true,color:BRONZE,characterSpacing:12})]});}
function P(runs,o={}){return new Paragraph({spacing:{after:o.after??110,line:o.line??278},children:Array.isArray(runs)?runs:[new TextRun({text:runs,font:SANS,size:20,color:o.c??INK})]});}
function t(x,o={}){return new TextRun({text:x,font:o.mono?MONO:SANS,size:o.size??20,color:o.c??INK,bold:!!o.b,italics:!!o.i});}
function link(a,tg){return [new TextRun({text:a,font:SANS,size:20,color:LINK,underline:{}}),new TextRun({text:" ["+tg+"]",font:MONO,size:12,color:MUTED})];}
function bullet(runs){return new Paragraph({bullet:{level:0},spacing:{after:50,line:272},children:Array.isArray(runs)?runs:[new TextRun({text:runs,font:SANS,size:20,color:INK})]});}
function num(runs,ref){return new Paragraph({numbering:{reference:ref,level:0},spacing:{after:60,line:272},children:Array.isArray(runs)?runs:[new TextRun({text:runs,font:SANS,size:20,color:INK})]});}
function rule(){return new Paragraph({spacing:{before:120,after:120},border:{bottom:{style:BorderStyle.SINGLE,size:6,color:RULE}},children:[new TextRun("")]});}
function meta(l,v,o={}){return new Paragraph({spacing:{after:26},children:[new TextRun({text:l+"   ",font:MONO,size:14,bold:true,color:BRONZE}),new TextRun({text:v,font:o.mono?MONO:SANS,size:o.size??17,color:INK,bold:!!o.b})]});}
function okline(x){return new Paragraph({spacing:{after:40},children:[new TextRun({text:"✓ ",font:SANS,size:16,bold:true,color:GREEN}),new TextRun({text:x,font:SANS,size:16,color:MUTED})]});}
function flag(x){return new Paragraph({spacing:{after:40},children:[new TextRun({text:"⚑ ",font:SANS,size:16,bold:true,color:RED}),new TextRun({text:x,font:SANS,size:16,color:MUTED})]});}
function shot(x){return new Table({width:{size:CW,type:WidthType.DXA},columnWidths:[CW],borders:{left:{style:BorderStyle.SINGLE,size:18,color:BRONZE},top:{style:BorderStyle.NONE},bottom:{style:BorderStyle.NONE},right:{style:BorderStyle.NONE}},
  rows:[new TableRow({children:[new TableCell({width:{size:CW,type:WidthType.DXA},shading:{type:ShadingType.CLEAR,fill:SHOT,color:"auto"},margins:{top:90,bottom:90,left:150,right:150},borders:{left:{style:BorderStyle.SINGLE,size:18,color:BRONZE},top:{style:BorderStyle.NONE},bottom:{style:BorderStyle.NONE},right:{style:BorderStyle.NONE}},
    children:[new Paragraph({spacing:{after:0,line:264},children:[new TextRun({text:"PRODUCT SHOT.  ",font:MONO,size:13,bold:true,color:BRONZE}),new TextRun({text:x,font:SANS,size:17,color:INK})]})]})]})]});}
// design-note callout: tells the designer how a section should look, in Trillet's design language
function dnote(x){return new Table({width:{size:CW,type:WidthType.DXA},columnWidths:[CW],borders:{left:{style:BorderStyle.SINGLE,size:18,color:NAVY},top:{style:BorderStyle.NONE},bottom:{style:BorderStyle.NONE},right:{style:BorderStyle.NONE}},
  rows:[new TableRow({children:[new TableCell({width:{size:CW,type:WidthType.DXA},shading:{type:ShadingType.CLEAR,fill:"EDF0F6",color:"auto"},margins:{top:90,bottom:90,left:150,right:150},borders:{left:{style:BorderStyle.SINGLE,size:18,color:NAVY},top:{style:BorderStyle.NONE},bottom:{style:BorderStyle.NONE},right:{style:BorderStyle.NONE}},
    children:[new Paragraph({spacing:{after:0,line:264},children:[new TextRun({text:"DESIGN NOTE.  ",font:MONO,size:13,bold:true,color:NAVY}),new TextRun({text:x,font:SANS,size:17,color:INK})]})]})]})]});}
function ans(text){return new Table({width:{size:CW,type:WidthType.DXA},columnWidths:[CW],borders:{left:{style:BorderStyle.SINGLE,size:18,color:GREEN},top:{style:BorderStyle.NONE},bottom:{style:BorderStyle.NONE},right:{style:BorderStyle.NONE}},
  rows:[new TableRow({children:[new TableCell({width:{size:CW,type:WidthType.DXA},shading:{type:ShadingType.CLEAR,fill:ANS,color:"auto"},margins:{top:110,bottom:110,left:150,right:150},borders:{left:{style:BorderStyle.SINGLE,size:18,color:GREEN},top:{style:BorderStyle.NONE},bottom:{style:BorderStyle.NONE},right:{style:BorderStyle.NONE}},
    children:[new Paragraph({spacing:{after:0,line:276},children:[new TextRun({text:"The short answer. ",font:SANS,size:20,bold:true,color:NAVY}),new TextRun({text:text,font:SANS,size:20,color:INK})]})]})]})]});}
function cta(primary,secondary){return new Paragraph({spacing:{before:40,after:60},children:[
  new TextRun({text:"  "+primary+"  ",font:SANS,size:18,bold:true,color:"FFFFFF",highlight:"darkBlue"}),
  new TextRun({text:"    "+secondary,font:SANS,size:18,color:LINK,underline:{}})]});}
function table(cols,headers,rows){const mk=(x,i,head)=>new TableCell({width:{size:cols[i],type:WidthType.DXA},shading:{type:ShadingType.CLEAR,fill:head?NAVY:"FFFFFF",color:"auto"},margins:{top:58,bottom:58,left:90,right:90},borders:bd(RULE),
    children:String(x).split("\n").map(line=>new Paragraph({spacing:{after:0,line:246},children:[new TextRun({text:line,font:SANS,size:head?14:13,bold:head,color:head?"FFFFFF":INK})]}))});
  return new Table({width:{size:cols.reduce((a,b)=>a+b,0),type:WidthType.DXA},columnWidths:cols,borders:bd(RULE),
    rows:[new TableRow({tableHeader:true,children:headers.map((h,i)=>mk(h,i,true))}),...rows.map(r=>new TableRow({children:r.map((cc,i)=>mk(cc,i,false))}))]});}
function spec(rows){const L=1760,R=7600;
  const mk=(x,lab)=>new TableCell({width:{size:lab?L:R,type:WidthType.DXA},shading:{type:ShadingType.CLEAR,fill:lab?"F4F5F7":"FFFFFF",color:"auto"},margins:{top:50,bottom:50,left:110,right:110},borders:bd(RULE),
    children:String(x).split("\n").map(line=>new Paragraph({spacing:{after:0,line:238},children:[new TextRun({text:line,font:SANS,size:15,bold:lab,color:lab?BRONZE:INK})]}))});
  return new Table({width:{size:L+R,type:WidthType.DXA},columnWidths:[L,R],borders:bd(RULE),
    rows:rows.map(([l,v])=>new TableRow({children:[mk(l,true),mk(v,false)]}))});}
function name(n,cat){return new Paragraph({spacing:{before:130,after:6},children:[new TextRun({text:n,font:SANS,size:22,bold:true,color:NAVY}),new TextRun({text:"    "+cat.toUpperCase(),font:MONO,size:13,bold:true,color:BRONZE,characterSpacing:8})]});}
function code(lines){return new Table({width:{size:CW,type:WidthType.DXA},columnWidths:[CW],borders:bd(RULE),
  rows:[new TableRow({children:[new TableCell({width:{size:CW,type:WidthType.DXA},shading:{type:ShadingType.CLEAR,fill:CODE,color:"auto"},margins:{top:90,bottom:90,left:120,right:120},borders:bd(RULE),
    children:lines.map(l=>new Paragraph({spacing:{after:0,line:230},children:[new TextRun({text:l||" ",font:MONO,size:13,color:INK})]}))})]})]});}
// numbering config so num() produces real 1,2,3 ordered lists
function numbering(refs){return {config:refs.map(r=>({reference:r,levels:[{level:0,format:"decimal",text:"%1.",alignment:"start",style:{paragraph:{indent:{left:420,hanging:260}}}}]}))};}
function build(outFile,children,refs){
  const doc=new Document({numbering:numbering(refs||[]),styles:{default:{document:{run:{font:SANS,size:20,color:INK}}}},sections:[{properties:{page:{margin:{top:1000,bottom:1000,left:1000,right:1000}}},children}]});
  return Packer.toBuffer(doc).then(b=>{require("fs").writeFileSync(outFile,b);console.log(outFile.split("/").pop(),"->",b.length,"bytes");});
}
module.exports={NAVY,INK,MUTED,BRONZE,GREEN,RED,RULE,LINK,eyebrow,H1,H2,H3,kicker,P,t,link,bullet,num,rule,meta,okline,flag,shot,dnote,ans,cta,table,spec,name,code,build};
