import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticSearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexDocument(index: string, document: any) {
    return this.elasticsearchService.indices.create({
      index,
      body: document,
    });
  }

  async getDocumentById(index: string, id: string) {
    return this.elasticsearchService.get({
      id,
      index,
    });
  }

  async searchDocuments(index: string, query: any) {
    return this.elasticsearchService.search({
      index,
      body: query,
    });
  }
}
