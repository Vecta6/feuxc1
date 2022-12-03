let etat = 2
let strip = neopixel.create(DigitalPin.P0, 5, NeoPixelMode.RGB)
neopixel.hsl(0, 0, 32)
basic.showLeds(`
. . # . .
. . # . .
. . # . .
. . . . .
. . # . .
`)
radio.setGroup(10)
//  Forever
basic.forever(function on_forever() {
    
    if (etat == 0) {
        countdown(10)
    }
    
})
input.onButtonPressed(Button.A, function button_a_pressed() {
    radio.sendString("Sy")
})
radio.onReceivedString(function radio_received(string: string) {
    
    if (string == "Fo") {
        feuR()
        countdown(10)
    } else if (string == "Sy") {
        etat = 0
    }
    
})
//  Sous programmes
function feuV() {
    
    etat = 1
    strip.clear()
    strip.setPixelColor(2, NeoPixelColors.Green)
    strip.show()
}

function feuR() {
    
    etat = 0
    strip.clear()
    strip.setPixelColor(3, NeoPixelColors.Orange)
    strip.show()
    basic.pause(2000)
    strip.clear()
    strip.setPixelColor(4, NeoPixelColors.Red)
    strip.show()
}

// # countdown en seconde
function countdown(time: number = 10) {
    feuR()
    for (let t = 0; t < time; t++) {
        basic.showNumber(time - t)
        if (t == 5) {
            radio.sendString("Fo")
        }
        
        basic.pause(1000)
    }
    basic.clearScreen()
    feuV()
}

