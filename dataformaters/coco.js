var cocoFormater = {
    fromCOCO : function(cocoData){
        let labellingData = {},
            idNumber = 1000;

        let categories = [];
        for(var category_i = 0; category_i < cocoData.categories.length; category_i++){
            categories.push(cocoData.categories[category_i]);
        }

        for(var image_i = 0; image_i < cocoData.images.length; image_i++){
            let image = cocoData.images[ image_i ];
            labellingData[ image.file_name ] = {
                "imagename": image.file_name,
                "shapeIndex": 0,
                "pointIndex": 0,
                "featurePointSize": 3,
                "attributes": [],
                "tags": [],
                "size": {
                    "height": image.height,
                    "width": image.width
                },
                "shapes": [],
                "zoomScale": 1,
                "defaultZoomScale": 1
            };

            for(var annot_i = 0; annot_i < cocoData.annotations.length; annot_i++){
                const annotation = cocoData.annotations[ annot_i ],
                    segLength = annotation.segmentation[0].length;
                if (annotation.image_id === image.id) {
                    // convert COCO to old format
                    if (!('x' in annotation.bbox)) {
                        annotation.bbox = {
                            x : annotation.bbox[0],
                            y : annotation.bbox[1],
                            width : annotation.bbox[2],
                            height : annotation.bbox[3],
                            w : annotation.bbox[2],
                            h : annotation.bbox[3],
                            cx : annotation.bbox[0]+annotation.bbox[2] / 2,
                            cy : annotation.bbox[1]+annotation.bbox[3] / 2,
                        }
                    }
                    let id = "SvgjsRect",
                        type = "rect",
                        bbox = annotation.bbox,

                        segmentation = annotation.segmentation[0],
                        points = [bbox.x, bbox.y, bbox.width, bbox.height];
                        keypoints = [featurePoints.x, featurePoints.y];
                        // points = [bbox.x, bbox.y];

                    if (segLength === 2 && (segmentation[0] === bbox.cx && segmentation[1] === bbox.cy) && annotation.area !== 0) {
                        id = "SvgjsCircle",
                        type = "circle",
                        points = [bbox.cx, bbox.cy, (bbox.height / 2)];
                    } else if ( segLength !== 8 || (segmentation[2] - segmentation[0]) !== (segmentation[4] - segmentation[6]) || (segmentation[3] - segmentation[1]) !== (segmentation[5] - segmentation[7]) ) {
                        let polyPoints = [];
                        id = "SvgjsPolygon",
                        type = "polygon";
                        for (var point_i = 0; point_i < segLength; point_i += 2) {
                            polyPoints.push(
                                [segmentation[point_i], segmentation[point_i+1]]
                            );
                        }
                        points = polyPoints;
                    }

                    labellingData[ image.file_name ].shapes.push({
                        "id": id+idNumber.toString(),
                        "label": "unlabelled",
                        "attributes": [],
                        "tags": [],
                        "type": type,
                        "bbox": annotation.bbox,
                        "points": points,
                        "featurePoints": [],
                        "category": categories.filter((x)=>x.id == annotation.category_id)[0].name
                    });
                    idNumber++;
                }
            }
        }

        return labellingData;
    },
    toCOCO : function(labellingData){
        var categories = [];

        var cocoData = {
            images : [],
            // "type": "instances",
            annotations : [],
            categories : []
        }
        var images = Object.keys(labellingData);

        //Add images
        for(var image_i = 0 ; image_i < images.length; image_i++){
            var imageName = images [image_i];
            cocoData.images.push({
                "file_name": imageName,
                "height": labellingData[ imageName ].size.height,
                "width": labellingData[ imageName ].size.width,
                "id": image_i+1
            });

            //Add annotations
            for(var shape_i=0; shape_i < labellingData[ imageName ].shapes.length;  shape_i++ ){
                var shape = labellingData[ imageName ].shapes[ shape_i ];
                if(categories.indexOf( shape.category ) === -1){
                    categories.push(shape.category);
                }
                var area, points = [];
                if(shape.type === "polygon"){
                    points = [];
                    for(var i = 0; i < shape.points.length; i++){
                        points = points.concat(shape.points[i]);
                    }
                    area = calcArea(points);
                }else if(shape.type === "circle"){
                    points = [shape.points[0], shape.points[1]];
                    area = shape.points[2] * shape.points[2] * Math.PI;
                }else if(shape.type === "rect"){
                    // keypoints = [];
                    // for(var i = 0; i < shape.keypoints.length; i++){
                    //     keypoints = keypoints.concat(shape.keypoints[i]);
                    // };
                    
                        // shape.points[0], shape.points[1], 
                        // shape.points[0]+shape.points[2], shape.points[1], 
                        // shape.points[0]+shape.points[2], shape.points[1] + shape.points[3],
                        // shape.points[0], shape.points[1] + shape.points[3],
                        var num_key =0;
                        for(var num=0; num < 14; num++){
                            round_x = Math.round(shape.featurePoints[num]["x"]);
                            round_y = Math.round(shape.featurePoints[num]["y"]);

                            points.push(round_x),
                            points.push(round_y),
                            points.push(shape.featurePoints[num]["v"]);
                            if (shape.featurePoints[num]["v"] == 2){
                                num_key++
                            }
                        };
                        
                        // shape.featurePoints[1]["x"], shape.featurePoints[1]["y"],
                        // shape.featurePoints[2]["x"], shape.featurePoints[2]["y"],
                        // shape.featurePoints[3]["x"], shape.featurePoints[3]["y"],
                        // shape.featurePoints[4]["x"], shape.featurePoints[4]["y"]


                    
                    area = shape.bbox.w*shape.bbox.h;
                }
                // else if(shape.type === "point"){
                //     keypoints = [];
                //     for(var i = 0; i < shape.keypoints.length; i++){
                //         keypoints = keypoints.concat(shape.keypoints[i]);
                //     };
                //     area = calcArea(keypoints);
                // }
// original format
                // cocoData.annotations.push({
                //     segmentation : [
                //         points
                //     ],
                //     area : area,
                //     "iscrowd": 0,
                //     "image_id": image_i+1,
                //     "bbox": [shape.bbox.x, shape.bbox.y, shape.bbox.width, shape.bbox.height],
                //     "category_id": categories.indexOf(shape.category) + 1,
                //     "id": shape_i+1,
                //     "ignore": 0
                // });
                cocoData.annotations.push({
                    "num_keypoints" : num_key,
                    area : Math.round(area), 
                    "keypoints" : points,
                    "bbox": [Math.round(shape.bbox.x), Math.round(shape.bbox.y), Math.round(shape.bbox.width), Math.round(shape.bbox.height)],
                    "image_id": image_i+1,
                    "category_id": 1,
                    "id": image_i+1
                });

            }
        }

        //Add cateogries
        // for(var category_i = 0 ; category_i < categories.length; category_i++){
        cocoData.categories.push({
            // "supercategory": "none",
            // "id": category_i + 1,
            // "name": categories [ category_i ] || "uncategorized"
            "supercategory": "human", 
            "skeleton": [[1, 2], [2, 3], [2, 4], [3, 5], [5, 7], [4, 6], [6, 8], [2, 9], [2, 10], [9, 11], [10, 12], [11, 13], [12, 14]], 
            "id": 1, 
            "keypoints": ["top_head", "neck", "left_shoulder", "right_shoulder", "left_elbow", "right_elbow", "left_wrist", "right_wrist", "left_hip", "right_hip", "left_knee", "right_knee", "left_ankle", "right_ankle"], 
            "name": "human"
        })
        // }

        return cocoData;
    }

}

function calcArea(coords){
    var area = 0;
    var numCoords = coords.length;

    for(var i=0; i<numCoords; i+=2){
        nexti = (i+2) % numCoords; //make last+1 wrap around to zero
        area += coords[i]*coords[nexti+1] - coords[i+1]*coords[nexti];
    }
    return Math.abs(area/2);
}
