  class AutomaticTyping {
  constructor(elementID, array, typingSpeed, deletingSpeed, staticTime) {
    this.container = document.getElementById(elementID);
    this.array = array;
    this.typingSpeed = typingSpeed;
    this.deletingSpeed = deletingSpeed;
    this.staticTime = staticTime;
    this.bigString = "*";
  }
  prepareString() {
    for (let i = 0; i < this.array.length; i++) {
      this.bigString += this.array[i] + "_";
    }
  }
  replaceCharAt(index, character) {
    this.bigString = this.bigString.substring(0, index) + character + this.bigString.substring(index + 1);
  }
  delay(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
  }
  async startTyping(traversalIndex, reverseTraversalIndex, staticDelay) {
    var startIndex = this.bigString.indexOf("*") + 1;
    var endIndex = this.bigString.indexOf("_");
    if (this.bigString.indexOf('*') == this.bigString.length - 1) {
      return;
    }
    var currentString = this.bigString.substring(startIndex, endIndex);
    if (traversalIndex < currentString.length) {
      this.container.innerHTML = currentString.substring(0, traversalIndex + 1) + "|";
      await this.delay(this.typingSpeed);
      // call the same function for displaying further characters
      this.startTyping(traversalIndex + 1, 0, true, false);
    } else {
      if (staticDelay) {
        await this.delay(this.staticTime);
        // now call the same function without static delay with the reverseTraversalIndex set
        this.startTyping(traversalIndex, traversalIndex - 1, false);
      } else {
      	// if this sentence was the final one, then do not delete it
        if(this.bigString.indexOf("_") == this.bigString.length-1)
        {
        	return;
        }
        // now, start deleting what was typed.
        if (reverseTraversalIndex > -1) {
          this.container.innerHTML = currentString.substring(0, reverseTraversalIndex - 1) + "|";
          await this.delay(this.deletingSpeed);
          this.startTyping(traversalIndex, reverseTraversalIndex - 1, false);
        } else {
          // now that the whole string has been deleted,
          // we have to set the next current string to be displayed.
          this.replaceCharAt(startIndex - 1, '`');
          this.replaceCharAt(endIndex, '*');
          this.startTyping(0, 0, false, false);
        }
      }
    }
  }
  start() {
    this.prepareString();
    this.startTyping(0, 0, false, false, true);
  }
}


function start() {
  const obj = new AutomaticTyping("type-input",
    ["I think.", "I code.", "I experiment.", "and then, ....", "I build!", "Passion for Excellence!"],
    120,
    50,
    500
  );
  obj.start();
}
