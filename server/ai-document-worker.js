process.once('message', async (workerData) => {

try {
  const buffer = Buffer.from(workerData.buffer, 'base64');
  if (workerData.format === 'pdf') {
    const { PDFParse } = await import('pdf-parse');
    const parser = new PDFParse({ data: new Uint8Array(buffer), isEvalSupported: false });
    let result;
    try { result = await parser.getText({ first: 20 }); }
    finally { await parser.destroy(); }
    process.send({ text: result.text.slice(0, 6001), partial: result.total > 20 || result.text.length > 6000 });
  } else {
    // Reject oversized ZIP expansion before asking the document parser to inflate.
    // DOCX uses a ZIP central directory; encrypted/ZIP64 archives are unsupported.
    let end = -1;
    for (let i = buffer.length - 22; i >= Math.max(0, buffer.length - 65557); i--) {
      if (buffer.readUInt32LE(i) === 0x06054b50) { end = i; break; }
    }
    if (end < 0) throw new Error('Invalid ZIP');
    const entries = buffer.readUInt16LE(end + 10);
    let offset = buffer.readUInt32LE(end + 16), expanded = 0;
    if (entries > 2000 || offset === 0xffffffff) throw new Error('Oversized ZIP');
    for (let i = 0; i < entries; i++) {
      if (buffer.readUInt32LE(offset) !== 0x02014b50 || (buffer.readUInt16LE(offset + 8) & 1)) throw new Error('Invalid ZIP entry');
      expanded += buffer.readUInt32LE(offset + 24);
      if (expanded > 12 * 1024 * 1024) throw new Error('Oversized document');
      offset += 46 + buffer.readUInt16LE(offset + 28) + buffer.readUInt16LE(offset + 30) + buffer.readUInt16LE(offset + 32);
    }
    const mammoth = await import('mammoth');
    const result = await mammoth.extractRawText({ buffer });
    process.send({ text: result.value.slice(0, 6001), partial: result.value.length > 6000 });
  }
} catch {
  process.send({ error: 'Không đọc được tệp. Hãy dùng PDF có văn bản hoặc DOCX không bị khóa, tối đa 2 MB.' });
}
process.disconnect();
});
