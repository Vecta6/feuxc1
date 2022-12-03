etat = 2
strip = neopixel.create(DigitalPin.P0, 5, NeoPixelMode.RGB)
neopixel.hsl(0, 0, 32)
basic.show_leds("""
. . # . .
. . # . .
. . # . .
. . . . .
. . # . .
""")
radio.set_group(10)

# Forever
def on_forever():
    global etat
    if etat==0:
        countdown(10)
basic.forever(on_forever)

def button_a_pressed():
    radio.send_string("Sy")
input.on_button_pressed(Button.A, button_a_pressed)

def radio_received(string):
    global etat
    if string=="Fo":
        feuR()
        countdown(10)
    elif string=="Sy":
        etat=0
radio.on_received_string(radio_received)

# Sous programmes
def feuV():
    global etat
    etat = 1
    strip.clear()
    strip.set_pixel_color(2, NeoPixelColors.GREEN)
    strip.show()

def feuR():
    global etat
    etat = 0
    strip.clear()
    strip.set_pixel_color(3, NeoPixelColors.ORANGE)
    strip.show()
    basic.pause(2000)
    strip.clear()
    strip.set_pixel_color(4, NeoPixelColors.RED)
    strip.show()

## countdown en seconde
def countdown(time=10):
    feuR()
    for t in range(time):
        basic.show_number(time - t)
        if t==5:
            radio.send_string("Fo")
        basic.pause(1000)
    basic.clear_screen()
    feuV()