class TypeWriter {
    constructor(element, texts) {
        this.element = element;
        this.texts = texts;
        this.currentText = 0;
        this.text = '';
        this.isDeleting = false;
        this.type();
    }

    type() {
        const fullText = this.texts[this.currentText];
        
        if (this.isDeleting) {
            this.text = fullText.substring(0, this.text.length - 1);
        } else {
            this.text = fullText.substring(0, this.text.length + 1);
        }

        this.element.innerHTML = this.highlightText(this.text) + '<span class="animate-pulse text-green-400">_</span>';

        let typeSpeed = 50;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.text === fullText) {
            typeSpeed = 1000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.text === '') {
            this.isDeleting = false;
            this.currentText = (this.currentText + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }

    highlightText(text) {
        return text.split(' ').map(word => {
            if (word.includes('predicted_classes') || word.includes('argmax')) {
                return `<span class="text-purple-400">${word} </span>`;
            }
            if (word.includes('keras') || word.includes('stakeai.h5')) {
                return `<span class="text-yellow-400">${word} </span>`;
            }
            return `<span class="text-green-400">${word} </span>`;
        }).join('');
    }
}

// Initialize typewriter when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const typewriter = new TypeWriter(document.getElementById('typewriter'), [
        "predicted_classes = np.argmax(predictions, axis=1)",
        "model = tf.keras.models.load_model('stakeai.h5')"
    ]);
});
