/**
 * given a curve, in a single 2d plane, generates a triangle strip ribbon.
 *
 * @normal -- a single THREE.Vector3d
 * @curveVerts -- the vertices of the curve
 * @widths -- either a single width or one width per vert
 *
 */
F.PlanerRibbonGeometry = function(normal, curveVerts, widths) {
    THREE.Geometry.call(this);

    //new F.PlanerRibbonGeometry(THREE.Vector3(0,0,1), [THREE.Vector3(0,0,0), THREE.Vector3(0,1,0)], [1.0])

    this.widths = widths;
    this.normal = normal;
    
    var width = widths[0];
    var count = 0;

    //
    // TODO: INCLUDE THE LAST QUAD PATCH
    //

    var start = 1//4;
    var end = curveVerts.length - 1;//24 
    for(var index = start; index <= end; index++) {
        var vert = curveVerts[index].clone();
        //vert.z = 0;
        var lastVert = curveVerts[index-1].clone();
        //lastVert.z = 0;
        
        if (widths.length > 1) 
            width = widths[index];

        var tangent = new THREE.Vector3();

        tangent.subVectors(vert, lastVert);
        tangent.normalize();
        normal.normalize();
        
        // construct an ortho-normal basis using the normal and the tangent
        var cotangent1 = new THREE.Vector3();
        cotangent1.crossVectors(normal, tangent);
        var cotangentOrig = cotangent1.clone();
        var cotangent2 = cotangent1.clone();

        var zBump = new THREE.Vector3(0,0,0);
        // We generate two verts for the previous position on the curve.
        this.vertices.push(cotangent1.multiplyScalar(width).add(lastVert).add(zBump));
        this.vertices.push(cotangent2.multiplyScalar(-width).add(lastVert).add(zBump));
        count += 2;

        if (index > start) {
            // once we've generated a quad's worth of points, start adding faces
            var face1 = new THREE.Face3(count - 4, count - 3, count - 2);
            face1.normal.copy(normal);
            face1.vertexNormals.push(normal.clone(), normal.clone(), normal.clone());
            this.faces.push(face1);
            // XXX: UVs have not been tested!
            // v1 is the V-coord for the previous vert on the curve
            // v2 is the V-coord for the current vert on the curve
            var v2 = (index-2)/(curveVerts.length-1);
            var v1 = (index-1)/(curveVerts.length-1);
            this.faceVertexUvs[0].push( [new THREE.Vector2(0, v2), 
                                         new THREE.Vector2(1, v2),
                                         new THREE.Vector2(0, v1)]);

            var face2 = new THREE.Face3(count - 3, count - 1, count - 2);
            face2.normal.copy(normal);
            face2.vertexNormals.push(normal.clone(), normal.clone(), normal.clone());
            this.faces.push(face2);
            this.faceVertexUvs[0].push( [new THREE.Vector2(1, v2), 
                                         new THREE.Vector2(1, v1),
                                         new THREE.Vector2(0, v1)]);

            if (index == end) {
                // We generate two verts for the last vert on the curve, using the
                // same tangent and width (since we can't calculate a cotangent
                // for the last vert).
                cotangent1 = cotangentOrig.clone();
                cotangent2 = cotangentOrig.clone();
                this.vertices.push(cotangent1.multiplyScalar(width).add(vert).add(zBump));
                this.vertices.push(cotangent2.multiplyScalar(-width).add(vert).add(zBump));
                count += 2;

                var face1 = new THREE.Face3(count - 4, count - 3, count - 2);
                face1.normal.copy(normal);
                face1.vertexNormals.push(normal.clone(), normal.clone(), normal.clone());
                this.faces.push(face1);
                // XXX: UVs have not been tested!
                // v1 is the V-coord for the last vert on the curve
                // v2 is the V-coord for the last-1 vert on the curve
                var v2 = (index-1)/(curveVerts.length-1);
                var v1 = (index)/(curveVerts.length-1);
                this.faceVertexUvs[0].push( [new THREE.Vector2(0, v1), 
                                             new THREE.Vector2(1, v1),
                                             new THREE.Vector2(0, v2)]);

                var face2 = new THREE.Face3(count - 3, count - 1, count - 2);
                face2.normal.copy(normal);
                face2.vertexNormals.push(normal.clone(), normal.clone(), normal.clone());
                this.faces.push(face2);
                this.faceVertexUvs[0].push( [new THREE.Vector2(1, v1), 
                                             new THREE.Vector2(1, v2),
                                             new THREE.Vector2(0, v2)]);
            }
        }
    }

    this.computeCentroids();
};

F.PlanerRibbonGeometry.prototype = Object.create( THREE.Geometry.prototype );

