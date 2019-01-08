import { chunkGeneratorFactory } from './generateChunk';
import { IChunkPlugin } from './plugins';
import { ChunkImporter, ImportFactory } from './types';

export function chunkImporterFactory(
  importFactory: ImportFactory,
  basePath: string,
  plugins: IChunkPlugin[] = []
): ChunkImporter {
  const generateChunk = chunkGeneratorFactory(importFactory, plugins);

  return function chunkImporter(name: string, relativePath?: string) {
    const generate: ChunkImporter = generateChunk(name);

    if (!relativePath) {
      return generate(basePath + '/' + name);
    }

    const normalizedPath = relativePath.replace(/\\/g, '/');
    const sourceless = normalizedPath.startsWith('src/') ? normalizedPath.replace('src/', '') : normalizedPath;

    return generate(sourceless + '/' + name);
  };
}
