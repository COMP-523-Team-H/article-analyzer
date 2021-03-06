import $ from "jquery"
import constant from "./constant"

var color = {

    rgba: (rgb, a)=>{
        return "rgba("+rgb[0]+","+rgb[1]+","+rgb[2]+","+a+")";
    },

    drawImage: (id, colors, selected) =>{
        if(colors.length === 0){
            console.log("sdjfklsdjf")
            $("#"+id).css("background", "");
        }
        if(colors.length === 1){
            var rgb = constant.COLOR[colors[0]];
            $("#"+id).css("background", color.rgba(rgb, 0.4));
        }else{
            var gradient = "linear-gradient(180deg";
            var interval = 100/(colors.length-1);
            colors.forEach((c, i)=>{
                var a = 0.4;
                if(c === selected){
                    a = 1;
                }
                var rgb = constant.COLOR[c];
                var rgba = color.rgba(rgb, a);
                // gradient+=", " + rgba + i*interval+"%"+", " + rgba + (i+1)*interval+"%";
                gradient+=", " + rgba +" "+ i*interval+"%";
            })
            gradient = gradient+")";
    
            $("#"+id).css("background", gradient);
        }
    },

    drawText: (id, colors, selected)=>{
        if(colors.length === 0){
            console.log("sdjfklsdjf")
            $("#"+id).css("background", "");
        }
        var count = colors.length;
        var a = 0.4;
        var rgb;
        if(selected){
            rgb = constant.COLOR[selected];
        }else{
            var accum = [0,0,0];
            colors.forEach(c=>{
                var rgb = constant.COLOR[c];
                var hsv = color.rgb2hsv(rgb);
                accum[0] += hsv[0];
                accum[1] += hsv[1];
                accum[2] += hsv[2];
            })
            var mix = accum.map(a=>a/count);
            rgb = color.hsv2rgb(mix);
        }
        var rgba = color.rgba(rgb,a);
        $("#"+id).css("background-color", rgba);
    },

    rgb2hsv: (rgb) =>{
        let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
        var r = rgb[0];
        var g = rgb[1];
        var b = rgb[2];
        rabs = r / 255;
        gabs = g / 255;
        babs = b / 255;
        v = Math.max(rabs, gabs, babs);
        diff = v - Math.min(rabs, gabs, babs);
        diffc = c => (v - c) / 6 / diff + 1 / 2;
        percentRoundFn = num => Math.round(num * 100) / 100;
        if (diff === 0) {
            h = s = 0;
        } else {
            s = diff / v;
            rr = diffc(rabs);
            gg = diffc(gabs);
            bb = diffc(babs);
    
            if (rabs === v) {
                h = bb - gg;
            } else if (gabs === v) {
                h = (1 / 3) + rr - bb;
            } else if (babs === v) {
                h = (2 / 3) + gg - rr;
            }
            if (h < 0) {
                h += 1;
            }else if (h > 1) {
                h -= 1;
            }
        }
        return [
            Math.round(h * 360),
            percentRoundFn(s * 100),
            percentRoundFn(v * 100)
        ];
    },

    hsv2rgb: (hsv) =>{
        var r, g, b, i, f, p, q, t, h, s, v;
        h = hsv[0]/360;
        s = hsv[1]/100;
        v = hsv[2]/100;
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            default: r = v; g = t; b = p; break;
            case 1: r = q; g = v; b = p; break;
            case 2: r = p; g = v; b = t; break;
            case 3: r = p; g = q; b = v; break;
            case 4: r = t; g = p; b = v; break;
            case 5: r = v; g = p; b = q; break;
        }
        return [
            Math.round(r * 255),
            Math.round(g * 255),
            Math.round(b * 255)
        ];
    },


    rgb2hex:(rgb) =>{   
        return rgb.reduce((accum, i)=>{
            var hex = Number(i).toString(16);
            if (hex.length < 2) {
                hex = "0" + hex;
            }
            return accum+hex;
        }, "");
    },
}


export default color;