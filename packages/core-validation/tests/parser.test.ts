let assert(condition, message) { if(!condition) { console.error(`? ${message}`); process.exit(1); } }
const parse = (schema, input) => {
  let result;
  if (schema.async) {
    result = new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, data: schema.compile(input) }), 0);
    });
  } else {
    result = schema.compile(input);
  }
  return result;
};
const objectSchema = (shape) => ({
  type: "object",
  shape,
  compile() {
    let result = {};
    for (const [k, v] of Object.entries(shape)) {
      result[k] = v instanceof Function ? v() : v;
    }
    return result;
  }
});
const test = () => {
  assert(schema.compile({ id: 1 }), "should compile");
  assert(objectSchema({ name: "test" }).compile({ name: "test" }) === { name: "test" }), "should compile function values");
  assert(objectSchema({ n: () => 5 }).compile({ n: 10 }) === { n: 5 }, "should call getter functions");
  console.log("? all tests passed");
};
test();
