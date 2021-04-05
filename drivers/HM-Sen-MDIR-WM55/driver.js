'use strict';

const Homey = require('homey');
const Driver = require('../../lib/driver.js');

class HomematicDriver extends Driver {

    onInit() {
        super.onInit();
        this.capabilities = [
            'alarm_motion',
            'measure_luminance'
        ]
        this.homematicTypes = ['HM-Sen-MDIR-WM55'];
        this.log(this.homematicTypes.join(','), 'has been inited');

        this._flowTriggerButtonPressed = this.homey.flow.getDeviceTriggerCard('HM-Sen-MDIR-WM55-press')
            .registerRunListener((args, state) => {
                if (args.button == state.button && args.pressType == state.pressType) {
                    return Promise.resolve(true)
                } else {
                    return Promise.reject(false)
                }
            })
    }

    triggerButtonPressedFlow(device, tokens, state) {
        this._flowTriggerButtonPressed
            .trigger(device, tokens, state)
            .catch(this.error)
    }


}

module.exports = HomematicDriver;