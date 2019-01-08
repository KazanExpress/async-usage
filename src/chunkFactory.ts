import { chunkGeneratorFactory } from './generateChunk';
import { ChunkImporter, Chunk, IChunkPlugin } from './';

export function chunkImporterFactoryGenerator(
  importFactory: (path: string) => Promise<Chunk>,
  basePath: string,
  plugins: IChunkPlugin[]
) {
  const generateChunk = chunkGeneratorFactory(importFactory, plugins);

  return function chunkImporterFactory(name: string, relativePath?: string) {

    const generate: ChunkImporter = generateChunk(name);

    if (!relativePath) {
      return generate(basePath + '/' + name);
    }

    const normalizedPath = relativePath.replace(/\\/g, '/');
    const sourceless = normalizedPath.startsWith('src/') ? normalizedPath.replace('src/', '') : normalizedPath;

    return generate(sourceless + '/' + name);
  };
}
