const fs = require('fs');
const lines = fs.readFileSync('/tmp/pdf_extract.txt', 'utf8').split('\n');

const SKIP_KEYWORDS = ['Nắp', 'nắp', 'Muỗng', 'muỗng', 'Nĩa', 'nĩa', 'Hộp', 'hộp', 'Tô ', 'Khay', 'khay', 'Hủ ', 'hủ ', 'Chén', 'chén', 'INSERT'];
const OZ_TO_ML = { 8:240, 9:270, 10:300, 12:360, 14:420, 16:500, 18:530, 20:600, 22:700, 24:710, 32:950 };

function getMaterial(name) {
  if (/giấy|paper|PAPER/i.test(name)) return 'PAPER';
  if (/PET/i.test(name)) return 'PET';
  return 'PP';
}

function getVolume(name, code) {
  // Try ml first
  const mlMatch = name.match(/(\d+)ml/i);
  if (mlMatch) return parseInt(mlMatch[1]);
  // Try oz
  const ozMatch = name.match(/(\d+)\s*oz/i) || code.match(/(\d+)OZ/i);
  if (ozMatch) return OZ_TO_ML[parseInt(ozMatch[1])] || Math.round(parseInt(ozMatch[1]) * 29.57);
  // Try 12/14oz pattern
  const dualOz = name.match(/(\d+)\/(\d+)\s*oz/i);
  if (dualOz) return OZ_TO_ML[parseInt(dualOz[1])] || 400;
  return null;
}

function getSizeGroup(name, code) {
  const m = code.match(/UKP(\d+)/);
  if (m) return 'phi ' + m[1];
  return null;
}

function getTypeDetail(name) {
  const n = name.toLowerCase();
  if (n.includes('đáy bầu')) return n.includes('mờ') ? 'đáy bầu mờ' : 'đáy bầu';
  if (n.includes('mờ')) return 'mờ';
  if (n.includes('sọc')) return 'sọc';
  if (n.includes('trơn')) return 'trơn';
  if (n.includes('cứng')) return 'cứng';
  if (n.includes('chịu lạnh')) return 'chịu lạnh';
  if (n.includes('2 lớp')) return '2 lớp';
  return 'standard';
}

const results = [];
const seenCodes = new Set();

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  // Match product lines: starts with number, then UKP code
  const match = line.match(/^\d+\s+(UKP[\w\-\/\(\)\s]+?)\s+(Ly\s+.+?|LY\s+.+?)\s+(Bao|Thùng)\s+([\d,]+)\s+([\d,]+)\s+([\d,.]+)\s+(?:cái|Cái|bộ)/i);
  if (!match) continue;

  let code = match[1].trim();
  let name = match[2].trim();
  const unit = match[3].trim();
  const priceHigh = parseInt(match[4].replace(/,/g, ''));
  const priceLow = parseInt(match[5].replace(/,/g, ''));
  const qtyStr = match[6].replace(/,/g, '').replace(/\./g, '');
  let qty = parseInt(qtyStr);
  if (qty < 10) qty = qty * 1000; // "1.000" parsed as "1000"

  // Skip non-cup items
  if (SKIP_KEYWORDS.some(k => name.includes(k) || code.includes(k))) continue;
  // Skip combos
  if (name.includes('kèm nắp') || name.includes('combo')) continue;

  const material = getMaterial(name);
  const volume = getVolume(name, code);
  const sizeGroup = getSizeGroup(name, code);
  const typeDetail = getTypeDetail(name);

  // Fix qty parsing
  const qtyMatch = line.match(/([\d,.]+)\s*(?:cái|Cái)/i);
  let quantity = 1000;
  if (qtyMatch) {
    const q = qtyMatch[1].replace(/\./g, '').replace(/,/g, '');
    quantity = parseInt(q) || 1000;
    if (quantity < 10) quantity = quantity * 1000;
  }

  results.push({
    code,
    name,
    material,
    volume_ml: volume,
    size_group: sizeGroup,
    type_detail: typeDetail,
    unit: unit.toLowerCase() === 'bao' ? 'Bao' : 'Thùng',
    quantity_per_unit: quantity,
    price_low: priceLow,
    price_high: priceHigh,
    price_per_unit_low: Math.round(priceLow / quantity),
    price_per_unit_high: Math.round(priceHigh / quantity)
  });
}

fs.writeFileSync(
  '/Users/phamtranngocduy/Documents/start-up/inlynhua/src/data/cup_prices.json',
  JSON.stringify(results, null, 2),
  'utf8'
);
console.log(`Extracted ${results.length} products`);
