export default function LoadingPlaceholder() {
  // TODO Customize this component to show a loading indicator or any placeholder
  return (
    <mesh scale={1.8}>
      <boxGeometry args={[5, 5, 5]} />
      <meshBasicMaterial color="gray" />
    </mesh>
  );
}
