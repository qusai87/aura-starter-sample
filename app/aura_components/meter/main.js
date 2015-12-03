define(['text!./meter.hbs', 'bower_components/zxcvbn/dist/zxcvbn.js'], function (template, zxcvbn) {    
    return {
        initialize: function() {
            this.html(template);
            var meter =  this.$find('#password-strength-meter');
            var text =  this.$find('#password-strength-text');
            var password = this.$el.closest('#'+meter.data('password-id'));
            var strength = {
                0: "Worst",
                1: "Bad",
                2: "Weak",
                3: "Good",
                4: "Strong"
            }
            password.on('change keyup',function() {
                var val = password.val();
                var result = zxcvbn(val);

                // Update the password strength meter
                meter.val(result.score);

                // Update the text indicator
                if (val !== "") {
                text.html( "Strength: " + strength[result.score]); 
                } else {
                text.html("");
                }
            });
        }
    }
});