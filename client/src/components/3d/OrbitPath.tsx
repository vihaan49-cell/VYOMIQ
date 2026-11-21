import React, { useMemo } from 'react';
import * as THREE from 'three';

interface OrbitPathProps {
  radiusX: number;
  radiusZ?: number;
  inclinationDeg?: number;
  color?: string;
  opacity?: number;
  dashed?: boolean;
}

export const OrbitPath: React.FC<OrbitPathProps> = ({
  radiusX,
  radiusZ,
  inclinationDeg = 0,
  color = '#38bdf8',
  opacity = 0.4,
  dashed = false,
}) => {
  const rZ = radiusZ || radiusX;

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(theta) * radiusX, 0, Math.sin(theta) * rZ));
    }
    return pts;
  }, [radiusX, rZ]);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    if (dashed) {
      // Compute line distances for dashed material
      const lineDistances = new Float32Array(points.length);
      let distance = 0;
      for (let i = 0; i < points.length; i++) {
        if (i > 0) {
          distance += points[i].distanceTo(points[i - 1]);
        }
        lineDistances[i] = distance;
      }
      geom.setAttribute('lineDistance', new THREE.BufferAttribute(lineDistances, 1));
    }
    return geom;
  }, [points, dashed]);

  const inclinationRad = (inclinationDeg * Math.PI) / 180;

  return (
    <group rotation={[inclinationRad, 0, 0]}>
      {dashed ? (
        <lineLoop geometry={geometry}>
          <lineDashedMaterial
            color={color}
            dashSize={0.5}
            gapSize={0.25}
            transparent
            opacity={opacity}
            depthWrite={false}
          />
        </lineLoop>
      ) : (
        <lineLoop geometry={geometry}>
          <lineBasicMaterial
            color={color}
            transparent
            opacity={opacity}
            depthWrite={false}
          />
        </lineLoop>
      )}
    </group>
  );
};
