import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticSearchService } from './elastic-search.service';

@Module({
  imports: [
    ElasticsearchModule.register({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      node: process.env.ELASTIC_SEARCH_URL || 'http://elasticsearch:9200/',
    }),
  ],
  providers: [ElasticSearchService],
  exports: [ElasticSearchService],
})
export class CustomElasticsearchModule {}
