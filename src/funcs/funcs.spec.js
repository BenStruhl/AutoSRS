import { expect } from "chai";
import { greet, bye, rotate90, fs} from "./funcs";
import env from "env";

describe("funcs", () => {
  it("greets", () => {
    expect(greet()).to.equal("Hello World!");
  });

  it("says goodbye", () => {
    expect(bye()).to.equal("See ya!");
  });

  it("rotates the image 90 degrees", () => {
      if(rotate90("./test_files/spiderCrab.jpg", "./test_files/spiderCrabTest.jpg"))
        console.log(fs.readFileSync("./test_files/spiderCrabTest.jpg") === fs.readFileSync("./test_files/spiderCrabRotation.jpg"))
        expect(fs.readFileSync("./test_files/spiderCrabTest.jpg"))
        .to.equal(fs.readFileSync("./test_files/spiderCrabRotation.jpg"));
  });

  it("should load test environment variables", () => {
    expect(env.name).to.equal("test");
    expect(env.description).to.equal(
      "Add here any environment specific stuff you like."
    );
  });

  it("babel features should work", () => {
    const a = { a: 1 };
    const b = { ...a, b: 2 };
    expect(b).to.eql({ a: 1, b: 2 });
  });
});
