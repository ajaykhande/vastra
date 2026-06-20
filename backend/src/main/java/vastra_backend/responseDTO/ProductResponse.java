package vastra_backend.responseDTO;

import java.util.List;

import lombok.Data;

@Data
public class ProductResponse {
    private Long id;
    private String company;
    private String name;

    private Double originalPrice;
    private Double currentPrice;

    private int discount;
    private String imageUrl;
    private int returnPeriod;

    private List<ProductVariantResponse> variants;

}
