import { expect } from "chai";
import { greet, bye, rotate90, fs, readDir, isTif} from "./funcs";
import env from "env";
import { readdir } from "fs";

describe("funcs", () => {
  it("greets", () => {
    expect(greet()).to.equal("Hello World!");
  });

  it("says goodbye", () => {
    expect(bye()).to.equal("See ya!");
  });

  it("rotates the image 90 degrees", () => {
    function getBase64Image(img) {
      // Create an empty canvas element
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
  
      // Copy the image contents to the canvas
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
  
      // Get the data-URL formatted image
      // Firefox supports PNG and JPEG. You could check img.src to
      // guess the original format, but be aware the using "image/jpg"
      // will re-encode the image.
      var dataURL = canvas.toDataURL("image/png");
  
      return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
      }
      if(rotate90("./test_files/spiderCrab.jpg", "./test_files/spiderCrabTest.jpg"))
        var expected = new Image();
        var test = new Image();
        expected.src = "./test_files/spiderCrabRotation.jpg";
        test.src = "./test_files/spiderCrabTest";
        expect(getBase64Image(test))
        .to.equal(getBase64Image(expected));
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

  it("Correct List of Diretories", () => {
    var a = readDir();
    expect(a[a.length-3]).to.eql("spiderCrab.jpg");
  })

  it("Check tifs works", () =>{
    var a = readDir();
    var c = 0;
    for(const b in a){
      if(isTif(a[b]))
        c++;
    }
    expect(c === 3);
  })
});
