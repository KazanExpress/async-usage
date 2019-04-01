import { chunkGeneratorFactory } from './generateChunk';
import { ChunkImporter, ImportFactory, IChunkPlugin, Chunk } from './types';

export function chunkImporterFactory<C extends Chunk, I extends ImportFactory<C> = ImportFactory<C>>(
  importFactory: I,
  basePath: string,
  plugins: IChunkPlugin<C>[] = []
): ChunkImporter<C> {
  const generateChunk = chunkGeneratorFactory<C, I>(importFactory, plugins);

  return function chunkImporter(name: string, relativePath?: string) {
    const generate = generateChunk(name);

    if (!relativePath) {
      return generate(basePath + '/' + name);
    }

    const normalizedPath = relativePath.replace(/\\/g, '/');
    const sourceless = normalizedPath.startsWith('src/') ? normalizedPath.replace('src/', '') : normalizedPath;

    return generate(sourceless + '/' + name);
  };
}
