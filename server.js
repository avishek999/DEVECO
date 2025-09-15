import {  postTextWithImageInLinkedIn} from "./service/linkdedInService.js";

(async () => {
  await postTextWithImageInLinkedIn("./public/logo.jpeg", "Hello LinkedIn 👋");
})();


