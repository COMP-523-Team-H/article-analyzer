import $ from "jquery"
import constant from "./constant"
import color from "./color"


const rangy = {

    nextNode:(node) => {
		if (node.hasChildNodes()) {
            return node.firstChild;
        } else {
            while (node && !node.nextSibling) {
                node = node.parentNode;
            }
            if (!node) {
                return null;
            }
            return node.nextSibling;
        }
	},
	
	getRangeSelectedNodes: (range) =>{
		var node = range.startContainer;
        var endNode = range.endContainer;
		if (node === endNode) {
			return constant.HIGHLIGHT_TAG_NAME.includes(node.nodeName)? [node]:[node.parentElement];
		}
		var rangeNodes = [];
		while (node && node !== endNode) {
            node = rangy.nextNode(node);
            if(node && constant.HIGHLIGHT_TAG_NAME.includes(node.nodeName)){
                rangeNodes.push(node);
            }
		}
        node = range.startContainer;
		while (node && node !== range.commonAncestorContainer) {
            if(node && constant.HIGHLIGHT_TAG_NAME.includes(node.nodeName)){
                rangeNodes.unshift(node);
            }
			node = node.parentNode;
		}
	
		return rangeNodes;
    },
    
    compress: (range)=>{
        var start = range.startContainer;
        var end = range.endContainer;
        return {start:start.id, end:end.id};
    },

    highlight: (range, color)=>{
        var nodes = rangy.getRangeSelectedNodes(range);
        nodes.forEach(node=>{
            if(node.id){
                $("#" + node.id).addClass("highlight");
                $("#" + node.id).addClass("highlight-" + color);
                rangy.refresh(node.id, null);
            }
        })
    },

    highlight_image:(id, color)=>{
        var image = $("#"+id);
        image.addClass("image");
        image.addClass("highlight");
        image.addClass("highlight-"+color);
    },

   
    addOverlay: (annotation)=>{
        var range = annotation.range;
        var color = annotation.color;
        if(annotation.type === "text"){
            var nodes = rangy.getRangeSelectedNodes(range);
            nodes.forEach(node=>{
                $(node).addClass("selected");
                $(node).addClass("selected-"+color);
                rangy.refresh(node.id, color);
            })
        }else{
            console.log("image add overlay")
        }
        
    },

    removeOverlay: (annotation)=>{
        var range = annotation.range;
        var color = annotation.color;
        if(annotation.type === "text"){
            var nodes = rangy.getRangeSelectedNodes(range);
            nodes.forEach(node=>{
                $(node).removeClass("selected");
                $(node).removeClass("selected-"+color);
                rangy.refresh(node.id, null);
            })
        }else{
            console.log("image remove overlay")
        }
    },

    refresh: (id, selected)=>{  //selected is the color selected. Null if not selected
        var classList = document.getElementById(id).classList;
        if(!classList.contains("highlight")){
            return;
        }else{
            var colors = [];
            classList.forEach(c => {
                var matches = c.match("(highlight-)([a-z]+)");
                if(matches){
                    var color = matches[2];
                    if(color){
                        colors.push(color);
                    }
                }
            });
            if(classList.contains("image")){
                color.drawImage(id, colors);
            }else{
                if(classList.contains("selected")){
                    color.drawText(id, colors, selected);
                }else{
                    color.drawText(id, colors, selected);
                }
            }
            
        }
    }

}

export default rangy;


// addTarget: (range, id)=>{
//     var nodes = rangy.getRangeSelectedNodes(range);
//     nodes.forEach(node=>{
//         var annotations = $("#" + node.id).attr("data-annotations");
//         if(!annotations){
//             annotations = "";
//         }
//         $("#" + node.id).attr("data-annotations", annotations+id+",");
//     })
// },

// addClick: (range, annotations)=>{
//     var nodes = rangy.getRangeSelectedNodes(range);
//     nodes.forEach(node=>{
//         var ids_str = node.getAttribute("data-annotations");
//         var ids = ids_str.split(",");
//         if(ids){ // CAN ACTUALLY ASSUME ANNOTATIONS WILL NEVER BE NULL 
//             $("#" + node.id).on("click", ()=>{
//                 $(".annotation").each((i, ele)=>{
//                     if(!ids.includes($(ele).attr("id"))){
//                         $(ele).addClass("hidden");
//                     }else{
//                         $(ele).removeClass("hidden");
//                     }
//                 })
//             })
//         }
//     })
// },
